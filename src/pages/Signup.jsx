import Picture from '../components/Home/Picture';
import RightSide from '../components/Signup/RightSide';
import Title from '../components/Title';

function Signup() {
  return (
    <div className="absolute top-1/2 left-1/2 container min-h-fit max-w-200 min-w-82 translate-[-50%] rounded-2xl shadow-2xl sm:flex sm:bg-linear-[270deg,#dde6ed_10%,#dde6ed_40%,#526d82_40%,#526d82_100%,teal] lg:max-w-250 xl:min-h-150 xl:max-w-280">
      <div className="bg-main hidden pr-4 text-center sm:flex sm:basis-1/3 sm:flex-col sm:justify-center xl:basis-[35%]">
        <Title>Have an account already? 😄</Title>
        <Picture
          name="logo-icon"
          alt="Logo Icon"
          className="mx-auto max-w-64"
        />
      </div>
      <RightSide />
    </div>
  );
}

export default Signup;
