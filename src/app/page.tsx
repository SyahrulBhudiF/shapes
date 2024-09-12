"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculationsOverview } from "./components/calculations-overview";
import { RecentCalculations } from "./components/recent-calculations";

export default async function DashboardPage() {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="shapes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="shapes">Shapes</TabsTrigger>
            <TabsTrigger value="geometry">Geometry</TabsTrigger>
          </TabsList>
          <TabsContent value="shapes" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold">Persegi</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Data total perhitungan persegi disini */}
                  <div className="text-2xl font-bold">10</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold">Segitiga</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Data total perhitungan segitiga disini */}
                  <div className="text-2xl font-bold">10</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold">Lingkaran</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Data total perhitungan lingkaran disini */}
                  <div className="text-2xl font-bold">10</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Shapes Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <CalculationsOverview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Calculations</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentCalculations />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="geometry" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold">Kubus</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Data total perhitungan kubus disini */}
                  <div className="text-2xl font-bold">10</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold">Limas</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Data total perhitungan limas disini */}
                  <div className="text-2xl font-bold">10</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold">Tabung</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Data total perhitungan tabung disini */}
                  <div className="text-2xl font-bold">10</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Geometry Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <CalculationsOverview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Calculations</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentCalculations />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
