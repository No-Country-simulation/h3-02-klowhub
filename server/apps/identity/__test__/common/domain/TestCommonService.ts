import { CommonService } from '@/common/domain/port/common.service';

export class TestCommonService extends CommonService {
  paginate(): any {
    return {};
  }
  formatTitle(): string {
    return '';
  }
  async validateEntity(): Promise<void> {}
  async saveEntity(): Promise<any> {
    return {};
  }
  async updateEntity(): Promise<any> {
    return {};
  }
  async throwDuplicateError(): Promise<any> {
    return {};
  }
}
