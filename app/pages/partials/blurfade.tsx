import { BlurFade } from "@/components/ui/blur-fade"

interface Text {
    title: string
    subtitle: string
}
export function BlurFadeText({ title, subtitle }: Text) {
    return (
        <section id="header">
            <BlurFade delay={0.25} inView>
                <h2 className="text-2xl mb-4 font-bold tracking-tighter sm:text-5xl xl:text-5xl/none text-white">
                    {title}
                </h2>
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
                <span className="text-lg tracking-tighter text-pretty sm:text-xl xl:text-xl/none text-white">
                    {subtitle}
                </span>
            </BlurFade>
        </section>
    )
}
