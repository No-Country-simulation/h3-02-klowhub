'use client';

import { useState } from 'react';
import CardsFlexContainer from '@core/components/CardsFlexContainer';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@core/components/Pagination';
import type { CourseCardType } from '@core/schemas/course-card.schema';
import CourseHorizontalCard from '@features/courses/components/CourseHorizontalCard';

interface CourseListWrapperProps {
  courses: CourseCardType[];
  viewDetailsText: string;
  addToCartText: string;
}
const ITEMS_PER_PAGE = 4;

export default function CourseListWrapper({
  courses,
  viewDetailsText,
  addToCartText,
}: CourseListWrapperProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCourse = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCourse = indexOfLastCourse - ITEMS_PER_PAGE;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <CardsFlexContainer className="flex flex-col" items={currentCourses}>
        {(item, i) => (
          <CourseHorizontalCard
            key={`gcc-${i}`}
            courseId={item?.['_id'] || item?.id}
            title={item.title}
            platform={item.platform}
            description={item?.basicDescription || ''}
            rating={item.rating}
            reviews={item.reviews}
            textButton={item.platform}
            tags={[]}
            imageSrc={item.imageUrl || '/images/mocks/course_mock1.png'}
            categoria={item.type}
            viewDetails={viewDetailsText}
            price={item.price}
            addToCartText={addToCartText}
          />
        )}
      </CardsFlexContainer>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              isActive={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index} className="h-full w-11">
              <PaginationLink
                className="h-full w-11"
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              isActive={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
