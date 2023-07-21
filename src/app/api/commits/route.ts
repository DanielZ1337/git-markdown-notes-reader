import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import axios from "axios";

export const revalidate = 60 * 60 * 24

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')
    const path = searchParams.get('path')
    const token = searchParams.get('token')
    const per_page = searchParams.get('per_page')
    const session = await getServerSession(authOptions)

    if (!owner || !repo || !path) return new Response('Missing parameters', {status: 400})

    const {data} = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: token ? `Bearer ${token}` : session?.user.accessToken && `Bearer ${session.user.accessToken}`,
        },
        params: {
            path: path,
            per_page: per_page ? per_page : 1
        }
    })

    return new Response(JSON.stringify(data), {status: 200})
}