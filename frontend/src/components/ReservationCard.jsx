const ReservationCard = ({ reservation }) => {
  const date = new Date(reservation.reservation_date).toLocaleString();
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{reservation.restaurants?.name || 'Restaurant'}</h3>
          <p className="text-sm text-slate-600">{reservation.restaurants?.location}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
          {reservation.status}
        </span>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Guests:</strong> {reservation.guests}
        </p>
      </div>
    </div>
  );
};

export default ReservationCard;
