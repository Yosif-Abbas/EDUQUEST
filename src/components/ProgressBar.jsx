function ProgressBar({ progress }) {
  return (
    <div
      className="h-1 w-full"
      style={{
        background: `linear-gradient(to right, 
            #876A9A 0%, 
            #876A9A ${progress}%, 
            #E9EAF0 ${progress}%, 
            #E9EAF0 100%)`,
      }}
    ></div>
  );
}

// #E9EAF0

export default ProgressBar;
