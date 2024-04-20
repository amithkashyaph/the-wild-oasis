import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";

const Stats = ({ bookings, confirmedStays, numDays, noOfCabins }) => {
  // 1. Total bookings
  const numBookings = bookings?.length;

  // 2. Sales
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. Check ins
  const checkIns = confirmedStays.length;

  // 4. Occupancy rate
  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * noOfCabins);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={totalSales}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
};

export default Stats;
