import { router, publicProcedure } from './trpc';
import { z } from 'zod';
import { db } from '@/lib/db';
import { TRPCError } from '@trpc/server';
import { hash } from 'bcrypt';
export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        username: z.string({ required_error: 'Username Required' }),
        email: z.string({ required_error: 'Email is Required' }).email(),
        password: z.string().min(8, 'Password should be atleast 8 characters.'),
      })
    )
    .mutation(async (req) => {
      const { username, email, password } = req.input;
      const existingUserByEmail = await db.user.findUnique({
        where: { email },
      });
      if (existingUserByEmail) {
        throw new TRPCError({
          message: 'User with this email already exists.',
          code: 'CONFLICT',
        });
      }
      const existingUserByUsername = await db.user.findUnique({
        where: { username },
      });
      if (existingUserByUsername) {
        throw new TRPCError({
          message: 'User with this username already exists',
          code: 'CONFLICT',
        });
      }
      const hashedPassword = await hash(password, 10);
      const newUser = await db.user.create({
        data: { username, email, password: hashedPassword },
      });
      return {
        user: { email, username },
        message: 'User created successfully',
      };
    }),
});
