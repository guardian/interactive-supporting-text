function findMarkdownLinks(content) {
    const anchorRegexp = /\[(.+?)\]\((.+?)\)/g;
    const matches = [];
    let next = anchorRegexp.exec(content);

    while (next) {
        matches.push(next);
        next = anchorRegexp.exec(content);
    }

    return matches;
}

function replaceMarkdownLinksWithTokens(prev, link, index) {
    return prev.replace(link[0], `%LINK_${index}%`);
}

function replaceTokensWithLinks(tokenisedWords, markdownLinks) {
    return tokenisedWords.map((word) => {
        const tokenRegexp = /%LINK_(\d)%/;
        let tokenIndex;
        let anchorHref;
        let anchorText;

        if (word.match(tokenRegexp)) {
            tokenIndex = tokenRegexp.exec(word)[1];
            [, anchorHref, anchorText] = markdownLinks[tokenIndex];
            return `<a href="${anchorHref}" target="_blank">${anchorText}</a>`;
        }

        return word;
    });
}

function getHtmlContentArray(content) {
    const markdownLinks = findMarkdownLinks(content);

    if (!markdownLinks.length) {
        return content.split(' ');
    }

    const tokenisedContent = markdownLinks.reduce(replaceMarkdownLinksWithTokens, content);
    const tokenisedWords = tokenisedContent.split(' ');

    return replaceTokensWithLinks(tokenisedWords, markdownLinks);
}

function getHtmlContentString(content) {
    const htmlContentArray = getHtmlContentArray(content);

    return htmlContentArray.join(' ');
}

export default {
    getHtmlContentArray,
    getHtmlContentString,
};
