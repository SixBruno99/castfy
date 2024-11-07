export const getCreatePodcastDate = (createdAt: Date | string) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const month = monthNames[date.getMonth()];

  return `${month} de ${year}`;
};

export const getCreateEpisodeData = (createdAt: Date | string) => {
  const date = new Date(createdAt);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
