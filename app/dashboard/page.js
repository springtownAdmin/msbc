"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container";
import { DatePickerWithRange } from "@/components/date-picker-range";
import { RecentActivity, Reminders, DeliveryStatus, EnquiryChart, PaymentOverdue } from '@/components/dashboard-activity';
import ProtectedRoute from "@/components/protected-route";
import { useEffect, useState } from "react";
import useStorage from "@/hooks/useStorage";
import useLoader, { Loader } from "@/hooks/useLoader";
import { useSelector } from "react-redux";
import useAPI from "@/hooks/useAPI";
import PermissionBasedComponent from "@/components/common/PermissionBasedComponent";

const Dashboard = () => {

  const [ dashboardData, setDashboardData ] = useState(null);
  const { show, showLoader, hideLoader } = useLoader();
  const { getEnquiriesChart, getUpcomingReminders, getEnquiryStatusHistory } = useAPI();

  const EnquirychartData = [
    { enquiry: "leadIn", enquiries: 2, fill: "blue" },
    { enquiry: "lost", enquiries: 1, fill: "red" },
    { enquiry: "quoteInProgress", enquiries: 1, fill: "orange" },
    { enquiry: "quoteReady", enquiries: 2, fill: "green" },
  ]

  const EnquirychartConfig = {

    enquiries: { label: "Enquiries" },
    "Lead In": { label: "Lead In", color: "hsl(var(--chart-1))" },
    "Lost": { label: "Lost", color: "hsl(var(--chart-2))" },
    "Quote In Progress": { label: "Quote In Progress", color: "hsl(var(--chart-3))" },
    "Quote Ready": { label: "Quote Ready", color: "hsl(var(--chart-4))" },
    "Waiting Information - Cost.": { label: "Waiting Information - Cost.", color: "hsl(var(--chart-5))" },
    "Waiting Information - Supl.": { label: "Waiting Information - Supl.", color: "hsl(var(--chart-6))" },

  }

  useEffect(() => {

    const setData = async () => {

      showLoader();
      const enquiriesData = await getEnquiriesChart();
      const remindersData = await getUpcomingReminders();
      const allActivities = await getEnquiryStatusHistory();

      const getAllKeys = Object.keys(enquiriesData);

      const chartData = [];
      const status_color = [ 'blue', 'red', 'orange', 'green', 'yellow', 'purple' ];

      getAllKeys.forEach((x, i) => {

        chartData.push({ enquiry: x, enquiries: enquiriesData[x], fill: status_color[i] })

      })

      console.log(remindersData);
      setDashboardData({ enquiryData: chartData, upcomingReminderData: remindersData, recentActivity: allActivities })
      hideLoader();

    };

    setData();

  }, []);


  return (

    <>

      <Container id={1} route='/dashboard'>

        <Loader show={show}>

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

            <PermissionBasedComponent permissionName='can_view' moduleUrl='/enquiry'>
              <EnquiryChart EnquirychartData={dashboardData?.enquiryData} />
            </PermissionBasedComponent>

            <PaymentOverdue />

            <PermissionBasedComponent permissionName='can_view' moduleUrl='/enquiry'>
              <Reminders remindersData={dashboardData?.upcomingReminderData} />
            </PermissionBasedComponent>

            <DeliveryStatus />

            <RecentActivity recentActivity={dashboardData?.recentActivity} />
          
          </div>

        </Loader>

      </Container>
      
    </>

  )
  
}

export default Dashboard