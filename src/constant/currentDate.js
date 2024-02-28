// Current Date
function currentDate() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();

  const formattedDate = `${date}-${month}-${year}`;

  return formattedDate;
}

export default currentDate;
