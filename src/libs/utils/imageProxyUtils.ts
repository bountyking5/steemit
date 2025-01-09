/*global $STM_Config:false*/

/**
 * This regular expression should capture all possible proxy domains
 * Possible URL schemes are:
 * <proxy>/<file url>
 * <proxy>/{int}x{int}/<external domain and file url>
 * <proxy>/{int}x{int}/[...<proxy>/{int}x{int}/]<external domain and file url>
 * <proxy>/{int}x{int}/[<proxy>/{int}x{int}/]<proxy>/<file url>
 * @type {RegExp}
 */
const rProxyDomain = /^http(s)?:\/\/steemit(dev|stage)?images.com\//g;
const rProxyDomainsDimensions =
  /http(s)?:\/\/steemit(dev|stage)?images.com\/([0-9]+x[0-9]+)\//g;
const NATURAL_SIZE = "0x0/";
const CAPPED_SIZE = "640x0/";
const DOUBLE_CAPPED_SIZE = "1280x0/";
const IMAGE_PROXY_URL = "https://steemitimages.com/";

/**
 * Returns the base URL of the image proxy
 * @returns {string} - The proxy URL
 */
export const imageProxy = () => IMAGE_PROXY_URL;

/**
 * Returns a default srcset string for responsive images
 * @param {string} url - The URL of the image
 * @returns {string} - The srcset string
 */
export const defaultSrcSet = (url: any) =>
  `${url} 1x, ${url.replace(CAPPED_SIZE, DOUBLE_CAPPED_SIZE)} 2x`;

/**
 * Checks if the image URL uses the default CAPPED_SIZE (640px wide)
 * @param {string} url - The URL of the image
 * @returns {boolean} - True if the image is using the default size
 */
export const isDefaultImageSize = (url: any) =>
  url?.startsWith(`${imageProxy()}${CAPPED_SIZE}`);

/**
 * Returns the default width (640px)
 * @returns {number} - The default width
 */
export const defaultWidth = () => Number.parseInt(CAPPED_SIZE.split("x")[0]);

/**
 * Strips all proxy domains from the beginning of the URL. 
 * Adds the global proxy if a dimension is specified.
 * @param {string} url - The URL to be proxified
 * @param {string|boolean} dimensions - Optional. If provided, URL is proxied.
 * @returns {string} - The proxified URL
 */
export function proxifyImageUrl(url: any, dimensions = "") {
  if (!url) return "";

  // Match the proxy domains and find the ones in the URL
  const proxyList = url.match(rProxyDomainsDimensions);
  let respUrl = url.replaceAll("amp;", "");  // Remove any ampersand encoding

  // If the URL contains proxy domains, strip them
  if (proxyList) {
    const lastProxy = proxyList[proxyList.length - 1];
    respUrl = url.substring(url.lastIndexOf(lastProxy) + lastProxy.length);
  }

  // If dimensions are provided, adjust the URL to reflect these dimensions
  if (dimensions) {
    let dims = dimensions + "/";
    if (typeof dimensions !== "string") {
      dims = proxyList
        ? proxyList?.shift()?.match(/([0-9]+x[0-9]+)\//g)?.[0] ?? ""
        : NATURAL_SIZE;
    }

    // If not a GIF, force the image size to be capped at 640px to save bandwidth
    if (!respUrl?.match(/\.gif$/) && dims === NATURAL_SIZE) {
      dims = CAPPED_SIZE;
    }

    // If dimensions are valid and it's not a direct proxy domain, return the proxified URL
    if (
      (NATURAL_SIZE !== dims && CAPPED_SIZE !== dims) ||
      !rProxyDomain.test(respUrl)
    ) {
      return IMAGE_PROXY_URL + dims + respUrl;
    }
  }

  return respUrl;  // Return the URL without any modifications if no dimensions are provided
}
