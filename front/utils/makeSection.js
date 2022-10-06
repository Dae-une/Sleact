import dayjs from 'dayjs';

export default function makeSection(chatList) {
  const sections = {};
  chatList.forEach((chat) => {
    const monthData = dayjs(chat.create).format('YYYY-MM-DD');
    if (Array.isArray(sections[monthData])) {
      sections[monthData].push(chat);
    } else {
      sections[monthData] = [chat];
    }
  });
  return sections;
}
