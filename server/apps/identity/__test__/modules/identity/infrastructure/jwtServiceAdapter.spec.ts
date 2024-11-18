import { BadRequestException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { MOCKED_USER } from '@test/common/domain/MockedUser';
import { mockJwtService } from '@test/common/infrastructure/utils/MockJwtService';
import { mockConfigService } from '@test/configuration/mockConfiguration';
import { version } from 'os';

import { CommonService } from '@/common/domain/port/common.service';
import { CommonServiceAdapter } from '@common/services/common.service.adapter';
import { TokenTypeEnum } from '@/modules/identity/domain/enums/tokenTypes.enum';
import { CustomJwtService } from '@/modules/identity/domain/ports/jwt.service';
import { JwtServiceAdapter } from '@/modules/identity/infrastructure/adapter/jwt.service.adapter';

describe('JwtServiceAdapter', () => {
  let service: CustomJwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: CustomJwtService, useClass: JwtServiceAdapter },
        { provide: CommonService, useClass: CommonServiceAdapter },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = await moduleRef.resolve<CustomJwtService>(CustomJwtService);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('generateAuthTokens', () => {
    it('should generate both access and refresh tokens', async () => {
      service.generateToken = jest
        .fn()
        .mockResolvedValueOnce('accessToken')
        .mockResolvedValueOnce('refreshToken');

      const [accessToken, refreshToken] =
        await service.generateAuthTokens(MOCKED_USER);

      expect(service.generateToken).toHaveBeenNthCalledWith(
        1,
        MOCKED_USER,
        TokenTypeEnum.ACCESS,
        undefined,
        undefined,
      );
      expect(service.generateToken).toHaveBeenNthCalledWith(
        2,
        MOCKED_USER,
        TokenTypeEnum.REFRESH,
        undefined,
        undefined,
      );
      expect(accessToken).toBe('accessToken');
      expect(refreshToken).toBe('refreshToken');
    });
  });

  describe('generateToken', () => {
    it('should generate an access token with correct options', async () => {
      mockJwtService.signAsync.mockResolvedValue('accessToken');
      const token = await service.generateToken(
        MOCKED_USER,
        TokenTypeEnum.ACCESS,
      );

      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        { id: MOCKED_USER.id },
        expect.objectContaining({
          issuer: service['issuer'],
          audience: service['domain'],
          algorithm: 'HS256',
          expiresIn: service['jwtConfig'].access.time,
          secret: service['jwtConfig'].access.secret,
        }),
      );
      expect(token).toBe('accessToken');
    });

    it('should generate a refresh token with correct options', async () => {
      mockJwtService.signAsync.mockResolvedValue('refreshToken');

      const token = await service.generateToken(
        MOCKED_USER,
        TokenTypeEnum.REFRESH,
      );

      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        {
          id: MOCKED_USER.id,
          version: MOCKED_USER.credentials.version,
          tokenId: expect.any(String),
        },
        expect.objectContaining({
          issuer: service['issuer'],
          audience: service['domain'],
          algorithm: 'HS256',
          expiresIn: service['jwtConfig'].refresh.time,
          secret: service['jwtConfig'].refresh.secret,
        }),
      );
      expect(token).toBe('refreshToken');
    });

    it('should generate a confirmation token with correct options', async () => {
      mockJwtService.signAsync.mockResolvedValue('confirmationToken');

      const token = await service.generateToken(
        MOCKED_USER,
        TokenTypeEnum.CONFIRMATION,
      );

      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        {
          id: MOCKED_USER.id,
          version: MOCKED_USER.credentials.version,
        },
        expect.objectContaining({
          issuer: service['issuer'],
          audience: service['domain'],
          subject: MOCKED_USER.email,
          algorithm: 'HS256',
          expiresIn: service['jwtConfig'].confirmation.time,
          secret: service['jwtConfig'].confirmation.secret,
        }),
      );
      expect(token).toBe('confirmationToken');
    });

    it('should generate a reset password token with correct options', async () => {
      mockJwtService.signAsync.mockResolvedValue('resetPasswordToken');

      const token = await service.generateToken(
        MOCKED_USER,
        TokenTypeEnum.RESET_PASSWORD,
      );

      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        { id: MOCKED_USER.id, version: MOCKED_USER.credentials.version },
        expect.objectContaining({
          issuer: service['issuer'],
          audience: service['domain'],
          subject: MOCKED_USER.email,
          algorithm: 'HS256',
          expiresIn: service['jwtConfig'].resetPassword.time,
          secret: service['jwtConfig'].resetPassword.secret,
        }),
      );
      expect(token).toBe('resetPasswordToken');
    });
  });

  describe('verifyToken', () => {
    it('should verify access token with correct options', async () => {
      const token = 'validAccessToken';
      const expectedPayload = { id: MOCKED_USER.id };

      mockJwtService.verifyAsync.mockResolvedValue(expectedPayload);

      const payload = await service.verifyToken(token, TokenTypeEnum.ACCESS);

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(
        token,
        expect.objectContaining({
          issuer: service['issuer'],
          audience: expect.any(RegExp),
          algorithms: ['HS256'],
          maxAge: service['jwtConfig'].access.time,
          secret: service['jwtConfig'].access.secret,
        }),
      );
      expect(payload).toEqual(expectedPayload);
    });

    it('should verify refresh token with correct options', async () => {
      const token = 'validRefreshToken';
      const expectedPayload = {
        id: MOCKED_USER.id,
        version: MOCKED_USER.credentials.version,
        tokenId: expect.any(String),
      };

      mockJwtService.verifyAsync.mockResolvedValue(expectedPayload);

      const payload = await service.verifyToken(token, TokenTypeEnum.REFRESH);

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(
        token,
        expect.objectContaining({
          issuer: service['issuer'],
          audience: expect.any(RegExp),
          algorithms: ['HS256'],
          maxAge: service['jwtConfig'].refresh.time,
          secret: service['jwtConfig'].refresh.secret,
        }),
      );
      expect(payload).toEqual(expectedPayload);
    });

    it('should verify confirmation token with correct options', async () => {
      const token = 'validConfirmationToken';
      const expectedPayload = {
        id: MOCKED_USER.id,
        version: MOCKED_USER.credentials.version,
      };

      mockJwtService.verifyAsync.mockResolvedValue(expectedPayload);

      const payload = await service.verifyToken(
        token,
        TokenTypeEnum.CONFIRMATION,
      );

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(
        token,
        expect.objectContaining({
          issuer: service['issuer'],
          audience: expect.any(RegExp),
          algorithms: ['HS256'],
          maxAge: service['jwtConfig'].confirmation.time,
          secret: service['jwtConfig'].confirmation.secret,
        }),
      );
      expect(payload).toEqual(expectedPayload);
    });

    it('should throw BadRequestException for invalid token', async () => {
      const token = 'invalidToken';
      mockJwtService.verifyAsync.mockRejectedValue(
        new JsonWebTokenError('invalid token'),
      );

      await expect(
        service.verifyToken(token, TokenTypeEnum.ACCESS),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
