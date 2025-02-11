import LeftSide from '../components/Login/LeftSide';
import LogoIcon from '../assets/logo-icon.png';
import Title from '../components/Title';

function Login() {
  return (
    <div className="absolute top-1/2 left-1/2 container min-h-fit max-w-200 min-w-82 translate-[-50%] rounded-2xl shadow-2xl sm:flex sm:bg-linear-[90deg,#dde6ed_10%,#dde6ed_40%,#526d82_40%,#526d82_100%,teal] lg:min-h-180 lg:max-w-250 xl:max-w-280">
      <LeftSide />
      <div className="bg-main hidden pl-4 text-center sm:flex sm:basis-1/3 sm:flex-col sm:justify-center xl:basis-[35%]">
        <Title>Hello Again 😄</Title>
        <img src={LogoIcon} alt="Logo Icon" className="" />
      </div>
    </div>
  );
}

export default Login;
