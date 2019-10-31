async function feed(parent, args, context, info) {
    const createWhereClause = () =>
        args.filter
            ? {
                OR: [
                    { description_contains: args.filter },
                    { url_contains: args.filter }
                ]
            }
            : {};

    const links = () =>
        context.prisma.links({
            where: createWhereClause(),
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy
        });

    const count = () => context.prisma.linksConnection({
        where: createWhereClause()
    })
        .aggregate()
        .count();

    return {
        links,
        count,
    };
}

export default {
    feed,
};