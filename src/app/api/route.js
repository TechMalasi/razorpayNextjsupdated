import { NextResponse } from "next/server";

export async function GET() {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()

  return NextResponse.json({ msg: "success" });
}


export async function POST(req) 
{

  const body = await req.json();  

  const name = body.name;
  const email = body.email;
  const mobile = body.mobile;
  const address = body.address;

  const user = await User.create({name,email,mobile,address});
  
  return NextResponse.json({ msg: "User Created Successfully" });
  
}
