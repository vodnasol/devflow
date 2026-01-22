import {NextResponse} from "next/server";

import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import {NotFoundError, ValidationError} from "@/lib/http-errors";
import {UserSchema} from "@/lib/validations";
import {z} from "zod";

export async function POST(request: Request) {
    const {email} = await request.json();

    try {
        const validatedData = UserSchema.partial().safeParse({email});

        if (!validatedData.success) {
            const tree = z.treeifyError(validatedData.error);

            const fieldErrors: Record<string, string[]> = {};

            // field-level errors
            if (tree.properties) {
                for (const [key, value] of Object.entries(tree.properties)) {
                    if (value?.errors?.length) {
                        fieldErrors[key] = value.errors;
                    }
                }
            }

            throw new ValidationError(fieldErrors);
        }
        const user = await User.findOne({email});
        if (!user) throw new NotFoundError("User");

        return NextResponse.json(
            {
                success: true,
                data: user,
            },
            {status: 200}
        );
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}