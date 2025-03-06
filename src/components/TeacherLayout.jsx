import { Outlet } from 'react-router-dom';

import TeacherSidebar from './Teacher/TeacherSidebar';
import TeacherHeader from './Teacher/TeacherHeader';
import TeacherStudentNavbar from './TeacherStudentNavbar';

function TeacherLayout() {
  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />

      <main className="flex grow flex-col gap-y-6">
        <TeacherStudentNavbar to="/teacher" />
        <div className="container lg:max-w-6xl">
          <TeacherHeader />
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default TeacherLayout;
