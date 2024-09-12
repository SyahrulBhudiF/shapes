"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@felte/react";
import userSchema from "@/lib/schema/userSchema";
import { z } from "zod";
import { validator } from "@felte/validator-zod";
// import { redirect } from "next/navigation";

const Page = () => {
  const handleSubmit = async (data: any) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataa = await response.json();
    const data2 = dataa.data;
    console.log(data2);
    if (response.ok) location.href = `/pages/shape?id=${data2.id}`;
  };

  const { form, isSubmitting, errors } = useForm({
    extend: validator<z.infer<typeof userSchema>>({
      schema: userSchema,
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex-1 grid grid-cols-1 border p-4 mt-12 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Biodata Siswa</h2>
      </div>
      <form ref={form}>
        <div className="grid grid-cols-2 gap-4">
          <div className="m-4">
            <label htmlFor="name">Nama</label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Masukkan nama"
            />
            {errors().name && (
              <p className="text-muted-foreground text-sm">{errors().name}</p>
            )}
          </div>
          <div className="m-4">
            <label htmlFor="age">Umur</label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="Masukkan Umur"
            />
            {errors().age && (
              <p className="text-muted-foreground text-sm">{errors().age}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="m-4">
            <label htmlFor="schoolName">Nama Sekolah</label>
            <Input
              id="schoolName"
              name="schoolName"
              type="text"
              placeholder="Masukkan Nama Sekolah"
            />
            {errors().schoolName && (
              <p className="text-muted-foreground text-sm">
                {errors().schoolName}
              </p>
            )}
          </div>
          <div className="m-4">
            <label htmlFor="address">Alamat</label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Masukkan Alamat"
            />
            {errors().address && (
              <p className="text-muted-foreground text-sm">
                {errors().address}
              </p>
            )}
          </div>
        </div>
        <div className="m-4">
          <label htmlFor="phone">No. Telp</label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Masukkan Nomor Telepon"
          />
          {errors().phone && (
            <p className="text-muted-foreground text-sm">{errors().phone}</p>
          )}
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
