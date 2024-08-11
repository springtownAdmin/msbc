"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container";
import { DatePickerWithRange } from "@/components/date-picker-range";
import { RecentActivity, Reminders, DeliveryStatus, EnquiryChart, PaymentOverdue } from '@/components/dashboard-activity';
import ProtectedRoute from "@/components/protected-route";

const Dashboard = () => {

  return (

    <>

      <Container id={1}>

        <div className="flex gap-3">

          <Select>

            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Branch</SelectLabel>
                <SelectItem value="head-office">Head Office</SelectItem>
              </SelectGroup>
            </SelectContent>

          </Select>

          <DatePickerWithRange />

          <Button>Apply</Button>

        </div>

        <div className="my-3 flex flex-wrap gap-3">

          <div>

            <Card className="w-[250px]">

              <CardHeader>
                <CardDescription>Secured Jobs</CardDescription>
                <CardTitle>$ 308K</CardTitle>
              </CardHeader>

              <CardContent className='text-red-500'>
                -0.4% from last month
              </CardContent>

            </Card>

            <Card className="w-[250px] mt-3">

              <CardHeader>
                <CardDescription>Deliveries Completed</CardDescription>
                <CardTitle>$ 826K</CardTitle>
              </CardHeader>

              <CardContent className='text-green-500'>
                +1.7% from last month
              </CardContent>

            </Card>

          </div>

          <div>

            <Card className="w-[250px]">

              <CardHeader>
                <CardDescription>Invoice Raised</CardDescription>
                <CardTitle>$ 122K</CardTitle>
              </CardHeader>

              <CardContent className='text-red-500'>
                -0.1% from last month
              </CardContent>

            </Card>

            <Card className="w-[250px] mt-3">

              <CardHeader>
                <CardDescription>Payment Received</CardDescription>
                <CardTitle>$ 608K</CardTitle>
              </CardHeader>

              <CardContent className='text-green-500'>
                +0.2% from last month
              </CardContent>

            </Card>

          </div>

          <EnquiryChart />

          <PaymentOverdue />

          <Reminders />

          <DeliveryStatus />

          <RecentActivity />
        
        </div>

      </Container>
      
    </>

  )
  
}

export default Dashboard