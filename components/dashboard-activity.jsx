"use client"

import * as React from 'react';
import { CartesianGrid, XAxis, Area, AreaChart, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "./ui/card"
import { Label, Pie, PieChart } from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bar, BarChart, LabelList } from "recharts"
import { Button } from './ui/button';

const AreachartData = [
  { elements: "Black Handle", planned_qty: 50 },
  { elements: "Door", planned_qty: 30 },
  { elements: "Fix Window 2", planned_qty: 10 },
  { elements: "Folding System - Slider", planned_qty: 30 },
  { elements: "L Angle", planned_qty: 25 },
  { elements: "Side hung window - window elements", planned_qty: 40 },
]

const AreachartConfig = {
  planned_qty: {
    label: "Planned Qty",
    color: "#2563eb",
  }
}

const EnquirychartData = [
    { enquiry: "leadIn", enquiries: 2, fill: "blue" },
    { enquiry: "lost", enquiries: 1, fill: "red" },
    { enquiry: "quoteInProgress", enquiries: 1, fill: "orange" },
    { enquiry: "quoteReady", enquiries: 2, fill: "green" },
]
  
const EnquirychartConfig = {
enquiries: {
    label: "Enquiries",
},
leadIn: {
    label: "Lead In",
    color: "hsl(var(--chart-1))",
},
lost: {
    label: "Lost",
    color: "hsl(var(--chart-2))",
},
quoteInProgress: {
    label: "Quote In Progress",
    color: "hsl(var(--chart-3))",
},
quoteReady: {
    label: "Quote Ready",
    color: "hsl(var(--chart-4))",
}
}

const BarchartData = [
    { amount: "$ 30.00", overdue: 1419 },
    { amount: "$ 273.00", overdue: 1200 },
    { amount: "$ 21.00", overdue: 1000 },
    { amount: "$ 18.00", overdue: 1130 },
]

const BarchartConfig = {
    overdue: {
      label: "Overdue in day(s)",
      color: "hsl(var(--chart-1))",
    },
    label: {
      color: "hsl(var(--background))",
    },
}

export const DeliveryStatus = () => {

  return (

    <Card className='h-[400px] w-[700px]'>

        <CardHeader className="pb-4">
            <CardTitle>Delivery Status</CardTitle>
        </CardHeader>

        <ChartContainer config={AreachartConfig} className='w-[90%] h-[75%] p-3'>

          <AreaChart accessibilityLayer data={AreachartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="elements" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value = '') => value.slice(0, 3)} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} tickFormatter={(value = 0) => value} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8600ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8600ff" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area dataKey="planned_qty" type="natural" fill="url(#fillDesktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
          </AreaChart>

        </ChartContainer>

    </Card>
  )
}

export const EnquiryChart = () => {

    const totalVisitors = React.useMemo(() => {
      return EnquirychartData.reduce((acc, curr) => acc + curr.enquiries, 0)
    }, [])
  
    return (
  
      <Card className="flex flex-col w-[350px]">
  
        <CardHeader className="pb-0">
          <CardTitle>Enquiries</CardTitle>
        </CardHeader>
  
        <CardContent className="flex-1 pb-0">
  
          <ChartContainer config={EnquirychartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
  
              <Pie data={EnquirychartData} dataKey="enquiries" nameKey="enquiry" innerRadius={60} strokeWidth={5}>
                <Label
                  content={({ viewBox }) => {
  
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {

                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">

                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {totalVisitors.toLocaleString()}
                          </tspan>

                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            Enquiries
                          </tspan>

                        </text>
                      )
                    }
  
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
  
        </CardContent>
        
      </Card>
  
    )
}

export const Reminders = () => {

    return (
      <>
          <Card className='w-[400px]'>
  
              <CardHeader>
                  <CardTitle>Reminders</CardTitle>
              </CardHeader>
  
              <CardContent className='h-full overflow-auto'>
  
                  {[1, 2].map((v, i) => (
  
                      <div key={`reminder-${i}`}>
                      
                          <div className='flex justify-between'>
  
                              <div className='flex gap-5'>
  
                                  <Avatar>
                                      <AvatarImage />
                                      <AvatarFallback className='bg-yellow-100'>KM</AvatarFallback>
                                  </Avatar>
  
                                  <div>
                                      <div>Kamran</div>
                                      <CardDescription className='text-xs'>13 Feb 2024</CardDescription>
                                  </div>
  
                              </div>
  
                              <div>
  
                                  <Button variant="outline" disabled>12:00 PM</Button>
  
                              </div>
  
                          </div>
  
                          <hr className='border-gray-100 my-4' />
  
                      </div>
  
                  ))}
  
              </CardContent>
  
          </Card>
      </>
    );
  
}

export const RecentActivity = () => {

    return (
      <>
          <Card className='w-[570px] h-[400px]'>
  
              <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
  
              <CardContent className='overflow-auto h-[90%]'>
  
                  <ol className="relative border-s border-gray-200 dark:border-gray-700">                  
                      <li className="mb-10 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">20 min ago</time>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">PO No.: 2338</h3>
                          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Status has been Updated - Draft</p>
                      </li>
                      <li className="mb-10 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">27 min ago</time>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quotation No.: 2000279</h3>
                          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Status has been Updated - Secured Job</p>
                      </li>
                      <li className="ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">45 min ago</time>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enquiry No. 2312</h3>
                          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Status has been Updated - Received</p>
                      </li>
                  </ol>
  
              </CardContent>
  
          </Card>
      </>
    );
  
}

export const PaymentOverdue = () => {

    return (
  
      <Card className='w-[400px]'>
  
          <CardHeader>
              <CardTitle>Payment Overdue</CardTitle>
              <CardDescription>$ 112K</CardDescription>
          </CardHeader>
      
          <CardContent>
  
              <ChartContainer config={BarchartConfig}>
  
                  <BarChart accessibilityLayer data={BarchartData} layout="vertical" margin={{ right: 16 }}>

                      <CartesianGrid horizontal={false} />
                      <YAxis dataKey="amount" type="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value = '') => value.slice(0, 3)} hide />
                      <XAxis dataKey="overdue" type="number" tickFormatter={(value = 0) => value} hide />
  
                      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
  
                      <Bar dataKey="overdue" layout="vertical" fill="green" radius={4}>
                          <LabelList dataKey="amount" position="insideLeft" offset={8} className="fill-[--color-label]" fontSize={12} />
                          <LabelList dataKey="overdue" position="right" offset={8} className="fill-foreground" fontSize={12} />
                      </Bar>
  
                  </BarChart>
  
              </ChartContainer>
              
          </CardContent>
  
      </Card>
  
    )

}