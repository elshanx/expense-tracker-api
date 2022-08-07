function paginate({ page, pageSize }) {
  page = parseInt(page) * 1 || 1;
  let limit = parseInt(pageSize) * 1 || 50;
  let skip = (page - 1) * limit;
  return { limit, skip, page };
}

function filterByDate({ from, to }) {
  if (from) {
    from = new Date(from);
    from.setHours(0, 0, 0, 0);
    to = new Date();
    to.setHours(23, 59, 59, 999);
  }

  if (to) {
    to = new Date(to);
    to.setHours(23, 59, 59, 999);
  }

  return { from, to };
}

module.exports = {
  paginate,
  filterByDate,
};
