# Chrome Extension Implementation Plan

**I. Prerequisites & Initial Setup**

1.  **Chrome Web Store Developer Account:**
    *   Ensure you have a Chrome Web Store developer account. If not, go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard) and register. There's a one-time $5 registration fee.
2.  **Organize Extension Files:**
    *   It's good practice to have all your core extension files (`manifest.json`, HTML, CSS, JS, images) in a dedicated directory (e.g., `src/` or `chrome_extension_files/`). This will be the directory you zip up.
3.  **Review `manifest.json` for Chrome:**
    *   **`manifest_version`:** Ensure this is set to `3`. Manifest V2 extensions are no longer accepted for new submissions.
    *   **`name`**, **`version`**, **`description`**: Make sure these are appropriate for your Chrome extension. The `version` number is important for updates (e.g., "1.0", "1.0.1").
    *   **`action` (replaces `browser_action` or `page_action` from MV2):**
        *   Define your popup: `"default_popup": "popup.html"`
        *   Define icons:
            ```json
            "default_icons": {
              "16": "images/icon16.png",
              "48": "images/icon48.png",
              "128": "images/icon128.png"
            }
            ```
    *   **`icons`:** Specify icons for the Chrome Web Store listing and extension management page:
        ```json
        "icons": {
          "16": "images/icon16.png",
          "48": "images/icon48.png",
          "128": "images/icon128.png"
        }
        ```
    *   **`permissions`:** List all necessary permissions (e.g., `"storage"`, `"activeTab"`, `"scripting"`). Review Chrome's permission documentation for Manifest V3, as some permissions have changed or require more specific declarations. For example, host permissions are now often managed under `host_permissions` or requested dynamically.
    *   **`background` (Service Worker):**
        *   If you have a background script, declare it as a service worker:
            ```json
            "background": {
              "service_worker": "background.js"
            }
            ```
    *   **`content_scripts`:** Ensure your content script declarations are correct:
        ```json
        "content_scripts": [
          {
            "matches": ["<all_urls>", "http://*/*", "https://*/*"], // Or more specific patterns
            "js": ["content.js"],
            "css": ["styles.css"] // Optional
          }
        ]
        ```
    *   **`host_permissions`:** If your extension needs to access specific websites (e.g., for `fetch` requests from the service worker or for `scripting.executeScript` on specific origins), list them here. Example: `"https://*.example.com/"`.
    *   **Validate your `manifest.json`:** Use an online JSON validator or a linter to catch syntax errors.

**II. Local Development & Testing**

1.  **Load Unpacked Extension in Chrome:**
    *   Open Chrome.
    *   Navigate to `chrome://extensions/`.
    *   Enable "Developer mode" using the toggle in the top-right corner.
    *   Click the "Load unpacked" button.
    *   Select the directory containing your extension files (the one with `manifest.json` at its root).
2.  **Test Core Functionality:**
    *   **Popup:** Click your extension's icon in the Chrome toolbar. Verify `popup.html` loads and `popup.js` functions correctly.
    *   **Content Scripts:** Navigate to web pages where your content scripts should run. Verify they are injected and operating as expected.
    *   **Background Logic (Service Worker):** Test any background tasks or event listeners. You can inspect the service worker by clicking the "service worker" link for your extension on the `chrome://extensions/` page. This will open DevTools for the service worker.
    *   **Options Page (if any):** If you have an options page defined in `manifest.json` (e.g., `"options_page": "options.html"`), right-click your extension icon and select "Options" or find the options link on the `chrome://extensions/` page. Test its functionality.
    *   **Site Blocking (if applicable):** Thoroughly test the site blocking features on various websites.
3.  **Debugging:**
    *   **Popup:** Right-click inside the popup and select "Inspect" to open DevTools for the popup.
    *   **Content Scripts:** Open DevTools on a webpage where your content script is active (Ctrl+Shift+I or Cmd+Opt+I). Your content script's console logs and errors will appear here. You can also see your content scripts listed in the "Sources" tab under "Content scripts".
    *   **Service Worker:** As mentioned, use the "service worker" link on `chrome://extensions/`.
4.  **Iterate:** Make necessary code changes, then click the "Reload" icon (🔄) for your extension on the `chrome://extensions/` page to apply changes. Retest.

**III. Packaging the Extension**

1.  **Final Code Review & Cleanup:**
    *   Remove any `console.log` statements or debugging code not intended for production.
    *   Ensure all image paths and file references in your HTML, CSS, and JS are correct and relative to the extension's root directory.
    *   Double-check your `manifest.json` for accuracy and completeness.
2.  **Create ZIP File:**
    *   Navigate to the directory that contains your `manifest.json` and all other extension assets (e.g., `src/`).
    *   Select all files and subdirectories within this folder.
    *   Compress them into a single ZIP file. **Important:** The `manifest.json` file must be at the root level of the ZIP archive, not inside a subdirectory within the ZIP.
        *   **On macOS:** Select files > Right-click > "Compress [N] items".
        *   **On Windows:** Select files > Right-click > "Send to" > "Compressed (zipped) folder".
    *   Name the ZIP file descriptively, perhaps including the version number (e.g., `minimal-site-blocker-chrome-v1.0.zip`).

**IV. Publishing to Chrome Web Store**

1.  **Prepare Store Listing Assets:**
    *   **Icons:** You'll need a 128x128 icon (already specified in `manifest.json`) for the main store listing.
    *   **Screenshots:** Prepare at least one screenshot (1280x800 or 640x400 pixels). More screenshots showing different features are better.
    *   **Promotional Tiles (Optional but Recommended):**
        *   Small promo tile: 440x280 pixels.
        *   Marquee promo tile: 1400x560 pixels.
    *   **Description:** Write a clear and concise description of your extension, what it does, and its benefits.
    *   **Privacy Policy:** You **must** provide a privacy policy if your extension handles any user data. This can be a publicly accessible URL to a webpage detailing your data practices.
2.  **Upload to Chrome Developer Dashboard:**
    *   Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
    *   Click "Add new item."
    *   If prompted, accept the developer agreement.
    *   Click "Choose file," select your ZIP file, and click "Upload."
3.  **Complete Store Listing Details:**
    *   After a successful upload, you'll be taken to the item's edit page. Fill out the following tabs:
        *   **Package:** Shows details of your uploaded package. Not much to edit here initially.
        *   **Store Listing:**
            *   **Detailed Description:** Your full extension description.
            *   **Icons:** Upload your 128x128 icon (if not perfectly picked from the manifest).
            *   **Screenshots:** Upload your screenshots.
            *   **Promotional Tiles:** Upload if you have them.
            *   **Category:** Choose the most relevant category.
            *   **Language:** Set the primary language.
            *   **Contact Email:** Provide an email for support.
        *   **Privacy Practices:**
            *   **Single Purpose:** Clearly state the single main purpose of your extension.
            *   **Permissions Justification:** For each permission requested in your `manifest.json`, you must justify why your extension needs it. Be clear and specific.
            *   **Data Usage:** Declare if and how your extension collects, uses, or shares user data. If you state "This extension does not collect any user data," ensure this is accurate.
            *   **Privacy Policy URL:** Provide the URL to your privacy policy.
        *   **Distribution:**
            *   **Visibility Options:**
                *   **Public:** Visible to everyone in the Chrome Web Store.
                *   **Unlisted:** Not searchable, only accessible via a direct link. Useful for testing with a limited audience.
                *   **Private:** Only available to users in a specific Google Group (if you set one up) or to designated trusted testers.
            *   **Countries:** Select the countries where your extension will be available.
            *   **Pricing:** Set to "Free" or configure paid options (requires additional setup).
4.  **Submit for Review:**
    *   Once all sections are filled and you are satisfied, click the "Submit for review" button.
    *   You may be asked to confirm your submission.
    *   **Deferred Publishing (Optional):** You can choose to have the extension publish automatically after approval or to publish it manually once approved.
5.  **Review Process:**
    *   Your extension will now be reviewed by the Chrome Web Store team. This can take anywhere from a few hours to several days (or longer for complex extensions or if issues are found).
    *   You'll receive email notifications about the status of your submission (e.g., approved, rejected, more information needed).
    *   You can check the status in the Developer Dashboard.

**V. Post-Submission & Updates**

1.  **Monitoring:**
    *   If your extension is rejected, the email will usually state the reasons. Address the issues and resubmit.
    *   If approved and you didn't choose deferred publishing, it will go live.
2.  **Publishing (if deferred):** If you chose deferred publishing, once approved, you'll have a "Publish" button in the Developer Dashboard for that item.
3.  **Maintenance & Updates:**
    *   To update your extension:
        1.  Make your code changes.
        2.  **Increment the `version` number in your `manifest.json` file.** This is crucial. (e.g., from "1.0" to "1.1" or "1.0.1").
        3.  Re-package your extension into a new ZIP file.
        4.  In the Chrome Developer Dashboard, go to your item's listing.
        5.  Go to the "Package" tab and upload the new ZIP file.
        6.  Update any store listing details if necessary.
        7.  Submit for review again. Users will automatically receive the update once it's approved and published.
