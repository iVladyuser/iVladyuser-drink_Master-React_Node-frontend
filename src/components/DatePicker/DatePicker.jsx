import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';
// import MaskedInput from 'react-text-mask';
import { CalendarGlobalStyles } from './DatePicker.styled';
import { FormField } from 'components/SignUpSignInForms/SignUpForm/Sign.styled';

const StyledDatePicker = ({ getDateOfBirth }) => {
  const [startDate, setStartDate] = useState(null);

  const handleDateChange = date => {
    setStartDate(date);
    const formattedDate = format(date, 'dd/MM/yyyy');
    getDateOfBirth(formattedDate);
  };

  return (
    <>
      <DatePicker
        selected={startDate}
        placeholderText="dd/mm/yyyy"
        showIcon
        toggleCalendarOnIconClick
        icon={
          <svg
            className="icon"
            style={{ position: 'absolute', right: 24, top: 20, fontSize: 18 }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8333 3.33331H4.16667C3.24619 3.33331 2.5 4.07951 2.5 4.99998V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V4.99998C17.5 4.07951 16.7538 3.33331 15.8333 3.33331Z"
              stroke="#F3F3F3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.3333 1.66669V5.00002"
              stroke="#F3F3F3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.66675 1.66669V5.00002"
              stroke="#F3F3F3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.5 8.33331H17.5"
              stroke="#F3F3F3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
        customInput={<FormField />}
        onChange={handleDateChange}
        dateFormat={'dd/MM/yyyy'}
        calendarStartDay={1}
      />
      <CalendarGlobalStyles />
    </>
  );
};

export default StyledDatePicker;
