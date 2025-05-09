import Spinner from '../Spinner';

function SummaryCard({
  icon,
  value,
  label,
  explain = '',
  color = '#FFF2E5',
  isLoading = false,
}) {
  return (
    <div className="flex items-center gap-3 p-2 font-normal">
      <div className={`bg-[${color}] p-4 text-lg`}>{icon}</div>
      <div>
        <div className="flex items-center gap-x-2">
          {isLoading ? <Spinner /> : <h2 className="text-xl">{value}</h2>}
          <p className="">{label}</p>
        </div>

        <p className="text-[12px] text-[#4E5566]">{explain}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
