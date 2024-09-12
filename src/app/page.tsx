"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {CalculationsOverview} from "./components/calculations-overview";
import {RecentCalculations} from "./components/recent-calculations";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useEffect, useState} from "react";
import {userInterface} from "@/lib/interface/userInterface";

export default function DashboardPage() {
    const [data, setData] = useState([]);
    const [count, setCount] = useState({
        square: 0,
        circle: 0,
        triangle: 0,
        pyramid: 0,
        cube: 0,
        cylinder: 0,
        total: 0,
    });
    const [sortColumn, setSortColumn] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (column: string) => {
        setSortColumn(column);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/user?sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                });
                const result = await response.json();

                const newCount = {...count};

                for (let j = 0; j < result.data[0].calculations.length; j++) {
                    switch (result.data[0].calculations[j].shapeId) {
                        case 22:
                            newCount.square += 1;
                            break;
                        case 23:
                            newCount.circle += 1;
                            break;
                        case 24:
                            newCount.triangle += 1;
                            break;
                        case 25:
                            newCount.pyramid += 1;
                            break;
                        case 26:
                            newCount.cube += 1;
                            break;
                        case 27:
                            newCount.cube += 1;
                            break;
                        case 28:
                            newCount.cylinder += 1;
                            break;
                        case 29:
                            newCount.cylinder += 1;
                            break;
                        case 30:
                            newCount.cylinder += 1;
                            break;
                    }
                }

                setCount(newCount);

                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [sortColumn, sortOrder]);

    const handleClick = (id?: number) => {
        return async () => {
            try {
                const urlCsv = id ? `/api/csv?id=${id}` : `/api/csv`;
                const response = await fetch(urlCsv, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                });
                const blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'calculations.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Error downloading CSV:", error);
            }
        }
    }

    const geometry = {
        "Kubus": count.cube,
        "Limas": count.pyramid,
        "Tabung": count.cylinder,
    };

    const shapes = {
        "Persegi": count.square,
        "Segitiga": count.triangle,
        "Lingkaran": count.circle,
    }

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
                                    <div className="text-2xl font-bold">{count.square}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-bold">Segitiga</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Data total perhitungan segitiga disini */}
                                    <div className="text-2xl font-bold">{count.triangle}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-bold">Lingkaran</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Data total perhitungan lingkaran disini */}
                                    <div className="text-2xl font-bold">{count.circle}</div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="w-full">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Shapes Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <CalculationsOverview data={shapes}/>
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
                                    <div className="text-2xl font-bold">{count.cube}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-bold">Limas</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Data total perhitungan limas disini */}
                                    <div className="text-2xl font-bold">{count.pyramid}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-bold">Tabung</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Data total perhitungan tabung disini */}
                                    <div className="text-2xl font-bold">{count.cylinder}</div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="w-full">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Geometry Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <CalculationsOverview data={geometry}/>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className={"text-2xl"}>Tabel Siswa</CardTitle>
                        <CardTitle className={"text-sm"}>Download semua data <span
                            className={"cursor-pointer underline decoration-1 text-blue-500"}
                            onClick={handleClick()}>link</span></CardTitle>

                    </CardHeader>
                    <div className={"flex px-6 gap-4"}>
                        <div onClick={() => handleSort('name')}
                             className={"cursor-pointer underline decoration-1 text-blue-500 text-sm"}>Urutkan Nama
                        </div>
                        <div onClick={() => handleSort('age')}
                             className={"cursor-pointer underline decoration-1 text-blue-500 text-sm"}>Urutkan Umur
                        </div>
                    </div>
                    <CardContent>
                        <Table className={"table table- w-full"}>
                            <TableCaption>List Siswa</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Umur</TableHead>
                                    <TableHead>Alamat</TableHead>
                                    <TableHead>Sekolah</TableHead>
                                    <TableHead>No Hp</TableHead>
                                    <TableHead>Download Perhitungan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((item: userInterface, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.age}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.schoolName}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>
                                            <span className={"cursor-pointer"} onClick={handleClick(item.id)}>
                                                Download
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    )
        ;
}
