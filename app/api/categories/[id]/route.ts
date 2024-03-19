import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// export async function PUT(request:Request,{params}:{params:{id:string}}) {
//     try {
//         const {name} = await request.json()
//         const category = await prisma.category.update({
//             data:{name},
//             where:{id:Number(params.id)}
//         })
//         return Response.json(category)
//     } catch (error) {
//         return new Response(error as BodyInit,{
//             status:500
//         })
//     }
// }

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const categoryId = Number(params.id);
		const categoryWithPosts = await prisma.category.findUnique({
			where: { id: categoryId },
			include: {
				posts: true, // Include related posts in the response
			},
		});
		return Response.json(categoryWithPosts);
	} catch (error) {
		return new Response(error as BodyInit, {
			status: 500,
		});
	}
}

export async function DELETE(request:Request,{params}:{params:{id:string}}) {
    try {
    const category = await prisma.category.delete({
        where:{id:Number(params.id)}
    })
    return Response.json(category)
        
    } catch (error) {
        return new Response(error as BodyInit,{
            status:500
        })
    }
}