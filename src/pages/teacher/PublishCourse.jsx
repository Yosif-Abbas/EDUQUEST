function PublishCourse() {
  return (
    <div>
      <div>
        <h2 className="mb-6 text-lg">Message</h2>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="mb-6 flex grow flex-col gap-1.5">
            <label htmlFor="welcome-message" className="">
              Welcome Message
            </label>
            <textarea
              type="text"
              id="welcome-message"
              placeholder="Your course title"
              className="h-30 border-1 border-white p-2 pl-4"
            ></textarea>
          </div>
          <div className="mb-6 flex grow flex-col gap-1.5">
            <label htmlFor="congrats-message" className="">
              Congratulation Message
            </label>
            <textarea
              type="text"
              id="congrats-message"
              placeholder="Your course title"
              className="h-30 border-1 border-white p-2 pl-4"
            ></textarea>
          </div>
        </div>
      </div>
      {/* Instructors */}
    </div>
  );
}

export default PublishCourse;
