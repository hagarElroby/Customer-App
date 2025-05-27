export type PhoneNumberAspects = {
  startWith: string[];
  count: number;
};

export type Country = {
  id: number;
  name: string;
  image: string;
  key: string;
  code: string;
  phoneNumberAspects: PhoneNumberAspects;
};

export const countryData: { data: Country[] } = {
  data: [
    {
      id: 1,
      name: "Iraq",
      image: "https://cdn.britannica.com/28/1728-050-FC0FCF9D/Flag-Iraq.jpg",
      key: "+964",
      code: "IQ",
      phoneNumberAspects: {
        startWith: ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"],
        count: 10,
      },
    },
    {
      id: 2,
      name: "Egypt",
      image: "https://cdn.britannica.com/85/185-050-6A8E2E8A/Flag-Egypt.jpg",
      key: "+20",
      code: "EG",
      phoneNumberAspects: {
        startWith: ["10", "11", "12", "15"],
        count: 10,
      },
    },
  ],
};
