"use client"

import { Label } from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";


export default function Home() {

const registerSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  username: z.string().trim().min(3, "Use at least 3 characters").max(20, "Use at most 20 characters"),
  name: z.string().trim().min(1, "Enter your name"),
  surname: z.string().trim().min(1, "Enter your surname"),
  password: z.string().min(8, "Use at least 8 characters"),
  confirmPassword: z.string().min(8, "Use at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterData = z.infer<typeof registerSchema>;

const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
const [serverError, setServerError] = useState<string | null>(null);
const [resendStatus, setResendStatus] = useState<string | null>(null);

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<RegisterData>({
  resolver: zodResolver(registerSchema),
  mode: "onChange",
});

const onSubmit = async (data: RegisterData) => {
	setServerError(null);

	const { error } = await authClient.signUp.email({
	email: data.email,
	password: data.password,
	name: data.name,
	surname: data.surname,
	username: data.username,
	});
	
	if (error) {
		setServerError(error.message ?? "Something went wrong. Please try again.");
		return;
	}

	setSubmittedEmail(data.email);
};

const resendVerification = async () => {
	if (!submittedEmail) return;
	setResendStatus(null);

	const { error } = await authClient.sendVerificationEmail({
		email: submittedEmail,
		callbackURL: "/",
	});

	setResendStatus(error ? "Could not resend the email. Try again shortly." : "Verification email sent.");
};

  if (submittedEmail) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-lg flex flex-col gap-3">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-muted-foreground">
            We sent a verification link to <span className="font-medium text-foreground">{submittedEmail}</span>.
            Click it to activate your account. You won&apos;t be able to sign in until your email is verified.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="outline" type="button" onClick={resendVerification}>Resend email</Button>
            {resendStatus && <p className="text-sm text-muted-foreground">{resendStatus}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
		<div className="w-full max-w-lg flex flex-col gap-3">	

			<div className="mb-3">
				<h1 className="text-2xl font-bold">Sign up</h1>
				<p className="text-muted-foreground">Create an account to gain access to all features.</p>
			</div>

			<div className="input-group">
				<Label htmlFor="email" className={errors.email ? "text-destructive" : undefined}>Email</Label>
				<Input 
					id="email" 
					placeholder="Enter your email"
					aria-invalid={!!errors.email}
					{...register("email")} />
			</div>

			<div className="input-group">
				<Label htmlFor="username" className={errors.username ? "text-destructive" : undefined}>Username</Label>
				<Input id="username" placeholder="Enter your username" aria-invalid={!!errors.username} {...register("username")} />
			</div>

			<div className="flex-grow flex justify-center gap-3">
				<div className="input-group">
					<Label htmlFor="name" className={errors.name ? "text-destructive" : undefined}>Name</Label>
					<Input id="name" placeholder="Enter your name" aria-invalid={!!errors.name} {...register("name")} />
				</div>

				<div className="input-group">
					<Label htmlFor="surname" className={errors.surname ? "text-destructive" : undefined}>Surname</Label>
					<Input id="surname" placeholder="Enter your surname" aria-invalid={!!errors.surname} {...register("surname")} />
				</div>			
			</div>		
			
			<div className="input-group">
				<Label htmlFor="password" className={errors.password ? "text-destructive" : undefined}>Password</Label>
				<Input id="password" type="password" placeholder="Enter your password" aria-invalid={!!errors.password} {...register("password")} />
			</div>

			<div className="input-group">
				<Label htmlFor="confirmPassword" className={errors.confirmPassword ? "text-destructive" : undefined}>Confirm Password</Label>
				
				<div>
					<Input id="confirmPassword" type="password" placeholder="Confirm your password" aria-invalid={!!errors.confirmPassword} {...register("confirmPassword")} />		
					{errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
				</div>
			</div>

			{serverError && <p className="text-sm text-destructive" role="alert">{serverError}</p>}

			<div className="flex gap-3">
				<Button variant="outline" type="reset" className="mt-4 flex-grow">Reset</Button>
				<Button type="submit" className="mt-4 flex-grow" disabled={isSubmitting}>{isSubmitting ? "Signing up..." : "Sign Up"}</Button>
			</div>
		</div>
    </form>
  );
}
