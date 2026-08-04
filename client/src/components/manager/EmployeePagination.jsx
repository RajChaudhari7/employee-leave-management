export default function EmployeePagination({
  pagination,
  page,
  setPage,
}) {
  if (
    !pagination ||
    pagination.totalPages <= 1
  )
    return null;

  return (
    <div className="flex justify-center mt-8 gap-3">

      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
        className="px-5 py-2 rounded-xl border disabled:opacity-40"
      >
        Previous
      </button>

      <span className="px-5 py-2 font-semibold">
        {page} / {pagination.totalPages}
      </span>

      <button
        disabled={
          page === pagination.totalPages
        }
        onClick={() =>
          setPage(page + 1)
        }
        className="px-5 py-2 rounded-xl border disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
}