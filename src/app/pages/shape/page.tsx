"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@felte/react";

const Page = () => {
  const [shape, setShape] = useState("Persegi");
  const [geometry, setGeometry] = useState("Kubus");
  const [geometryFormula, setGeometryFormula] = useState("Luas");

  const handleShapeChange = (value: string) => {
    setShape(value);
  };

  const handleGeometryChange = (value: string) => {
    setGeometry(value);
  };

  const handleGeometryFormulaChange = (value: string) => {
    setGeometryFormula(value);
  };

  const handleSubmit = async (data: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const result = [];
    const { formulaType1, formulaType2, shapeName1, shapeName2, ...params } =
      data;

    const extractParameters = (shapeName) => {
      const shapeParams = {};
      const shapeNameLower = shapeName.toLowerCase(); // Normalize shape name

      Object.keys(params).forEach((key) => {
        if (key.toLowerCase().endsWith(shapeNameLower)) {
          const paramKey = key
            .replace(new RegExp(shapeNameLower, "i"), "")
            .toLowerCase(); // Extract the parameter key
          shapeParams[paramKey] = params[key];
        }
      });

      return shapeParams;
    };
    if (formulaType1 && shapeName1) {
      result.push({
        formulaType: formulaType1,
        shapeName: shapeName1,
        parameters: extractParameters(shapeName1),
        id: id,
      });
    }

    if (formulaType2 && shapeName2) {
      result.push({
        formulaType: formulaType2,
        shapeName: shapeName2,
        parameters: extractParameters(shapeName2),
        id: id,
      });
    }

    result.map(async (dt) => {
      await fetch("/api/calculation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dt),
      });
    });
  };

  const { form, isSubmitting, errors } = useForm({
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex-1 flex flex-col border p-4 mt-12 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Calculate</h2>
      <form ref={form}>
        <div className="flex">
          <div className="flex flex-col border-r-2">
            <h2 className="text-xl font-bold tracking-tight">Bangun Datar</h2>
            <div className="flex gap-4">
              <div className="flex-1 m-4">
                <label htmlFor="shapeName1">Bangun Datar</label>
                <Select
                  onValueChange={handleShapeChange}
                  defaultValue={shape}
                  name="shapeName1"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Bangun Datar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Persegi">Persegi</SelectItem>
                      <SelectItem value="Lingkaran">Lingkaran</SelectItem>
                      <SelectItem value="Segitiga">Segitiga</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 m-4">
                <label htmlFor="formulaType1">Pilih Rumus</label>
                <Select defaultValue="Luas" name="formulaType1" disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Masukkan Luas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Luas">Luas</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {shape === "Persegi" && (
                <div className="m-4 col-span-3">
                  <label htmlFor="pPersegi">Sisi</label>
                  <Input
                    id="pPersegi"
                    name="pPersegi"
                    type="number"
                    placeholder="Masukkan panjang sisi"
                  />
                </div>
              )}

              {shape === "Lingkaran" && (
                <div className="m-4 col-span-3">
                  <label htmlFor="rLingkaran">Jari-Jari</label>
                  <Input
                    id="rLingkaran"
                    name="rLingkaran"
                    type="number"
                    placeholder="Masukkan jari-jari"
                  />
                </div>
              )}

              {shape === "Segitiga" && (
                <div className="m-4 col-span-3 flex justify-between gap-4">
                  <div>
                    <label htmlFor="pSegitiga">Panjang Alas</label>
                    <Input
                      id="pSegitiga"
                      name="pSegitiga"
                      type="number"
                      placeholder="Masukkan panjang alas"
                    />
                  </div>
                  <div>
                    <label htmlFor="lSegitiga">Tinggi</label>
                    <Input
                      id="lSegitiga"
                      name="lSegitiga"
                      type="number"
                      placeholder="Masukkan tinggi"
                    />
                  </div>
                  {}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col pl-2">
            <h2 className="text-xl font-bold tracking-tight">Bangun Ruang</h2>
            <div className="flex gap-4">
              <div className="flex-1 m-4">
                <label htmlFor="shapeName2">Bangun Ruang</label>
                <Select
                  onValueChange={handleGeometryChange}
                  defaultValue={geometry}
                  name="shapeName2"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Bangun Ruang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Kubus">Kubus</SelectItem>
                      <SelectItem value="Limas">Limas</SelectItem>
                      <SelectItem value="Tabung">Tabung</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 m-4">
                <label htmlFor="formulaType2">Pilih Rumus</label>
                <Select
                  defaultValue={geometryFormula}
                  onValueChange={handleGeometryFormulaChange}
                  name="formulaType2"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Rumus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Luas">Luas</SelectItem>
                      <SelectItem value="Volume">Volume</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {geometry === "Kubus" && (
                <div className="m-4 col-span-3">
                  <label htmlFor="pKubus">Sisi</label>
                  <Input
                    id="pKubus"
                    name="pKubus"
                    type="number"
                    placeholder="Masukkan Sisi"
                  />
                </div>
              )}

              {geometry === "Tabung" && (
                <div className="m-4 col-span-3 flex justify-between gap-4">
                  <div>
                    <label htmlFor="rTabung">Jari-Jari</label>
                    <Input
                      id="rTabung"
                      name="rTabung"
                      type="number"
                      placeholder="Masukkan Jari-Jari"
                    />
                  </div>
                  <div>
                    <label htmlFor="tTabung">Tinggi</label>
                    <Input
                      id="tTabung"
                      name="tTabung"
                      type="number"
                      placeholder="Masukkan tinggi"
                    />
                  </div>
                </div>
              )}

              {geometry === "Limas" && (
                <div className="m-4 col-span-3 flex justify-between gap-4">
                  <div>
                    <label htmlFor="pLimas">Panjang Alas</label>
                    <Input
                      id="pLimas"
                      name="pLimas"
                      type="number"
                      placeholder="Masukkan panjang alas"
                    />
                  </div>
                  <div>
                    <label htmlFor="tLimas">Tinggi</label>
                    <Input
                      id="tLimas"
                      name="tLimas"
                      type="number"
                      placeholder="Masukkan tinggi"
                    />
                  </div>
                  {geometryFormula === "Volume" && (
                    <div>
                      <label htmlFor="lLimas">Lebar Alas</label>
                      <Input
                        id="lLimas"
                        name="lLimas"
                        type="number"
                        placeholder="Masukkan Lebar Alas"
                      />
                      {errors().parameters && (
                        <p className="text-muted-foreground text-sm">
                          {errors().parameters}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
