import React from 'react';
import { useEffect, useState } from 'react';

const useCountdown = targetDate => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = countDown => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const DateTimeDisplay = ({ value, type }) => {
  return (
    <div>
      <span>
        {value}
        {type}
      </span>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <DateTimeDisplay value={days.toString().padStart(2, '0')} type={'d'} />
      <span>&nbsp; </span>
      <DateTimeDisplay value={hours.toString().padStart(2, '0')} type={'h'} />
      <span> &nbsp;</span>
      <DateTimeDisplay value={minutes.toString().padStart(2, '0')} type={'m'} />
      <span>&nbsp; </span>
      <DateTimeDisplay value={seconds.toString().padStart(2, '0')} type={'s'} />
    </div>
  );
};

const LaunchpadCountdown = ({ date }) => {
  const [days, hours, minutes, seconds] = useCountdown(date);

  if (days + hours + minutes + seconds <= 0) {
    //  setSale(true);
    return <></>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default LaunchpadCountdown;
