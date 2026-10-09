"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function SignInPage() {
    
    const [serverError, setServerError] = useState("");

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })
    type LoginData = z.infer<typeof loginSchema>;

    const router = useRouter();

    const onSubmit = async (data: LoginData) => {
        const { error } = await authClient.signIn.email({ email: data.email, password: data.password });

        if (error) {
        setServerError(
            error.status === 403
            ? "Please verify your email first. Check your inbox."
            : "Invalid email or password."
        );
        return;
        }
        router.push("/");
        router.refresh();
    };

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    });

    return (       
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
		<div className="w-full max-w-lg flex flex-col gap-3">	
            <Label htmlFor="email">Email</Label>
            <Input id="email" 
                placeholder="Enter your email" 
                aria-invalid={!!errors.email}
                {...register("email")} 
				/>

            <Label htmlFor="password">Password</Label>
            <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                aria-invalid={!!errors.password}
                {...register("password")}
            />

            <div className="text-red-500 text-sm">{serverError}</div>

            <Button type="submit" className="mt-4">Sign In</Button>
            <p className="mt-2 text-sm text-muted-foreground">Forgot your password? <a href="/forgot-password" className="text-primary">Reset it here</a>.</p>

		</div>
    </form>
    )
}
