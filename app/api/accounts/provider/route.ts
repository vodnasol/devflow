import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";
import {z} from "zod";

export async function POST(request: Request) {
    const { providerAccountId } = await request.json();

    try {
        const validatedData = AccountSchema.partial().safeParse({
            providerAccountId,
        });

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

            // optional form-level errors
            if (tree.errors?.length) {
                fieldErrors._form = tree.errors;
            }

            throw new ValidationError(fieldErrors);
        }

        const account = await Account.findOne({ providerAccountId });
        if (!account) throw new NotFoundError("Account");

        return NextResponse.json(
            {
                success: true,
                data: account,
            },
            { status: 200 }
        );
    } catch (error) {
        return handleError(error, "api") as APIErrorResponse;
    }
}