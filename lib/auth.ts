import NextAuth, { type NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { prisma } from './db';

// Email magic link provider with dev-friendly transport
export const authConfig = {
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [
		EmailProvider({
			from: process.env.EMAIL_FROM ?? 'no-reply@sonanos.local',
			maxAge: 60 * 60,
			async sendVerificationRequest({ identifier, url, provider }) {
				const transporter = nodemailer.createTransport({
					streamTransport: true,
					newline: 'lf',
					buffer: true,
				} as any);
				await transporter.sendMail({
					to: identifier,
					from: provider.from,
					subject: 'Dein Sonanos Anmeldelink',
					text: `Klicke zum Anmelden: ${url}`,
				});
				console.log(`Magic Link for ${identifier}: ${url}`);
			},
		}),
	],
	callbacks: {
		session: async ({ session, user }) => {
			if (session.user && user) (session.user as any).id = (user as any).id;
			return session;
		},
	},
} satisfies NextAuthConfig;

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(authConfig);