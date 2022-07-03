<template>
    <div class="pt-8">
        <div class="flex w-full items-start justify-start">
            <NuxtLink
                to="/"
                class="flex items-center justify-between gap-3 text-2xl hover:text-yellow-500 md:text-inherit"
            >
                <ArrowLeft /> Back
            </NuxtLink>
        </div>
        <article>
            <h1 class="pt-16 text-4xl">About Me</h1>
            <div
                class="mt-4 flex flex-col-reverse items-start justify-between md:flex-row"
            >
                <p class="mt-8 md:w-1/2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Autem odit temporibus aspernatur iusto dicta quae iste eum
                    ad et. Accusamus impedit, est deleniti sapiente ex nam
                    tempore amet ad mollitia voluptatibus commodi officia
                    quisquam dolores cumque neque? Natus reprehenderit sapiente,
                    corrupti consectetur molestiae alias aliquam neque quasi
                    obcaecati saepe blanditiis!
                </p>
            </div>
            <section>
                <h2 class="pt-16 text-xl">Specialized Knowledge</h2>
                <h1 class="text-4xl">
                    Building modern Aplications using industrty Standards
                </h1>
                <LogoBanner class="my-8" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam a porro ducimus sunt culpa, nostrum fuga cumque
                    aliquid illo velit, eos eum ratione blanditiis voluptate
                    soluta harum. Molestias, laudantium cumque?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusantium nostrum optio neque reiciendis et saepe illo
                    cumque, odio quibusdam totam numquam ut molestias corporis
                    soluta impedit, iure magni. Possimus sed id architecto ut
                    vitae totam ab doloribus quibusdam tempore facere quas atque
                    ipsum et labore est, fugiat assumenda odio voluptas.
                    Corporis alias amet quo est ea nesciunt soluta ducimus eos
                    vero sequi quia voluptate at maxime obcaecati unde cumque
                    laboriosam aperiam natus, maiores officiis iure dicta.
                    Voluptates optio rem eum accusamus, ullam hic veniam
                    possimus tempore doloremque provident facilis praesentium
                    in, eveniet voluptatem molestiae a odit qui, quisquam
                    perspiciatis earum. Adipisci praesentium eligendi
                    consectetur ut, sint saepe maiores odio similique
                    voluptatem, nobis illo numquam culpa molestias officia
                    corporis, doloribus atque sequi magnam labore. Neque quia
                    reiciendis harum ratione explicabo quisquam repudiandae
                    itaque odit dolorem aut, illum hic, doloremque ad fugiat
                    repellat animi, ex pariatur autem laudantium incidunt sequi
                    culpa consectetur. Reprehenderit fuga, alias aspernatur
                    delectus excepturi labore quas natus cupiditate doloremque
                    expedita deserunt id, tenetur doloribus magni ipsa
                    perspiciatis et, accusantium facere? Sunt fuga, esse, harum
                    fugiat tempora itaque nemo eligendi ducimus expedita, sequi
                    voluptas praesentium ab consequuntur? Dicta unde ab non
                    corporis quas cum vero nemo! Libero, praesentium. Temporibus
                    sapiente facere, culpa impedit labore, commodi maiores amet
                    dolorem provident voluptatem delectus cumque magnam velit
                    saepe reprehenderit. Nihil animi necessitatibus facere
                    suscipit vel corporis sint itaque iure! Inventore magnam
                    repellendus sint, nulla obcaecati voluptates! Impedit nulla
                    illo iure? Ab consequatur numquam explicabo quod debitis!
                    Fugit illo quae cumque repellendus accusamus consectetur
                    dolorem nulla! Alias optio aut, molestiae non pariatur
                    delectus eos vel nobis cumque. Fuga quasi temporibus
                    obcaecati modi sed, ipsa repudiandae suscipit! Ex itaque
                    tempora eos atque veritatis voluptatum reprehenderit dolore
                    reiciendis aperiam, aspernatur libero? Officia alias
                    assumenda consequatur quas esse, distinctio repellendus
                    dicta totam quos illo voluptas quasi laboriosam ut veniam
                    aperiam magni eveniet nostrum iure. At laborum delectus
                    maxime adipisci vitae culpa, est saepe eum ipsa numquam.
                    Quia, vero eos. Quia laudantium nesciunt, vero ullam eius
                    voluptatibus nisi delectus ad tempore necessitatibus alias
                    ducimus maiores facilis possimus animi harum eum ea illum
                    similique corporis a minima perferendis error incidunt.
                    Minus placeat sit repudiandae hic fugit excepturi,
                    laudantium alias maiores nihil totam vitae consequuntur nemo
                    quaerat id dolorem nisi ipsam. Dolorem odit architecto neque
                    tempore et at minima, corrupti tempora minus perspiciatis
                    libero ipsam quam, eligendi fugit aspernatur voluptate quod
                    pariatur aperiam cumque eum asperiores nam ipsa. Dolore
                    velit dolorum eius eligendi debitis consectetur ab nobis rem
                    harum soluta nemo, libero, quas nesciunt quis incidunt amet
                    accusamus explicabo! Iure saepe ab quidem exercitationem.
                    Soluta adipisci veniam quae ipsam nostrum architecto eos
                    saepe hic cumque. Ex nulla aliquam similique, tenetur maxime
                    quo minus voluptates itaque corrupti libero magni ad amet ea
                    provident exercitationem veritatis quaerat ipsa harum
                    pariatur incidunt. Voluptate dolorem quos, exercitationem
                    dignissimos pariatur minus odio, temporibus nostrum esse
                    totam modi atque voluptas sunt molestiae dolor minima
                    officiis porro debitis odit qui beatae eos? Odit, minima ex
                    odio veniam enim nesciunt aperiam aut quis quisquam velit
                    illo sequi?
                </p>
            </section>
        </article>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    pageTransition: {
        name: 'swipe-page-right',
        mode: 'out-in',
    },
})
</script>

<style scoped></style>
