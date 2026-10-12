interface User {
  name: string;
  nickname?: string;
}

const good: User = { name: "Ada" };

const nick: string | undefined = good.nickname;

export {};
