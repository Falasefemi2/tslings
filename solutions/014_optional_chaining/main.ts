interface User {
  name: string;
  address?: { city: string };
}

const user: User = { name: "Ada" };

const city: string = user.address?.city ?? "no city";

console.log(city);

export {};
