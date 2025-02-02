import LeftSide from '../components/Login/LeftSide';
import LogoIcon from '../assets/logo-icon.png';
import Title from '../components/Title';

function Login() {
  return (
    <div className="flex min-h-lvh bg-[#526D82]">
      <LeftSide />
      <div className="flex w-2/5 flex-col items-center justify-center gap-15">
        <Title className="">Hello Again 😄</Title>
        <img src={LogoIcon} alt="Logo Icon" className="h-115 w-115" />
      </div>
    </div>
  );
}

export default Login;
