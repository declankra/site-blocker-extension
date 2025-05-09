# Safari Extension Container App Implementation Plan

## I. Prerequisites & General Setup

1.  **Apple Developer Program Membership:**
    *   Ensure you have an active Apple Developer Program membership to be able to sign and submit apps to the App Store.
2.  **App IDs & Provisioning Profiles:**
    *   In the Apple Developer portal (developer.apple.com):
        *   Create unique App IDs for your macOS App and iOS App. Example: `com.yourdomain.minimalappname.macos` and `com.yourdomain.minimalappname.ios`.
        *   Create App IDs for your macOS Extension and iOS Extension. Example: `com.yourdomain.minimalappname.macos.extension` and `com.yourdomain.minimalappname.ios.extension`.
        *   Ensure the App IDs for the extensions have the "Safari Web Extension" capability enabled if it's a separate setting.
        *   Generate Development and Distribution Provisioning Profiles. Xcode's automatic signing can often manage this.
3.  **Xcode Project Setup:**
    *   **Open Project:** Open the `Minimal Site Blocker.xcodeproj` file in Xcode.
    *   **Target Verification:**
        *   In the Project Navigator (left sidebar), select the project root. In the main editor area, select each target ("macOS (App)", "macOS (Extension)", "iOS (App)", "iOS (Extension)") one by one.
        *   Go to the "Signing & Capabilities" tab for each target.
            *   Verify Bundle Identifiers match your App IDs.
            *   Set your Team and ensure signing certificates (Development and Distribution) are correctly configured. Xcode might offer to "Automatically manage signing."
        *   For the "macOS (App)" target, go to the "General" tab and check under "Frameworks, Libraries, and Embedded Content" that "macOS (Extension)" is listed and set to "Embed & Sign."
        *   For the "iOS (App)" target, go to the "General" tab and check under "Frameworks, Libraries, and Embedded Content" that "iOS (Extension)" is listed and set to "Embed & Sign."
    *   **Resource Copying (Crucial for Web Extension):**
        *   For both "macOS (Extension)" and "iOS (Extension)" targets:
            *   Go to the "Build Phases" tab.
            *   Expand the "Copy Bundle Resources" phase.
            *   **Ensure all files from your `src/` directory (e.g., `manifest.json`, `popup.html`, `popup.js`, `content.js`, CSS files, images) are listed here.** If not, drag them from Finder into this list for each extension target. This makes your web code available to the extension.

## II. macOS Container App (`Minimal Site Blocker/macOS (App)`)

1.  **Development & Configuration (in Xcode):**
    *   **UI Verification (if needed):**
        *   The UI files would typically be under the `Minimal Site Blocker/macOS (App)/` group in the Project Navigator (e.g., `ContentView.swift` if using SwiftUI, or `.storyboard`/`.xib` files if using AppKit).
    *   **Functionality:**
        *   Ensure the existing UI correctly informs the user how to enable the extension in Safari.
    *   **App Icon:**
        *   In the Project Navigator, find `Assets.xcassets` under the `Minimal Site Blocker/macOS (App)/` group (or a shared assets catalog). Select `AppIcon` to verify all required macOS icon sizes are filled.
    *   **Info.plist:**
        *   In the Project Navigator, find `Info.plist` under `Minimal Site Blocker/macOS (App)/`. Select it to review and ensure keys like `CFBundleDisplayName`, `CFBundleVersion` (Build Number), `CFBundleShortVersionString` (Version String), and `LSMinimumSystemVersion` are correctly set.
2.  **Testing (in Xcode):**
    *   **Select Scheme:** At the top of the Xcode window, next to the Play/Stop buttons, select the "macOS (App)" scheme from the dropdown.
    *   **Select Device:** Choose "My Mac" (or your specific Mac's name) as the run destination.
    *   **Run:** Click the Play button (or Product > Run).
    *   Verify the app launches and displays its informational UI correctly.
    *   Open Safari, go to Preferences > Extensions, and ensure "Minimal Site Blocker" appears and can be enabled.
    *   Test the extension's functionality (site blocking, popup UI) thoroughly in Safari. For debugging the extension's web code, use Safari's Develop menu > [Your Device/Simulator Name] > [Extension Name] > `popup.html` (or other relevant JS context).
3.  **App Store Connect - macOS App:**
    *   Log in to App Store Connect.
    *   Create/configure the app record as detailed previously.
    *   **Build Submission (from Xcode):**
        *   Select the "macOS (App)" scheme and "Any Mac (Apple Silicon, Intel)" (or a specific Mac architecture if intended).
        *   Go to Product > Archive.
        *   Once archiving is complete, the Organizer window will appear (Window > Organizer). Select the new archive.
        *   Click "Distribute App," choose "App Store Connect," then "Upload," and follow the prompts.

## III. iOS Container App (`Minimal Site Blocker/iOS (App)`)

1.  **Development & Configuration (in Xcode):**
    *   **UI Verification (if needed):**
        *   UI files would be under `Minimal Site Blocker/iOS (App)/` group (e.g., `ContentView.swift` or `.storyboard`/`.xib` files).
    *   **Functionality:**
        *   Ensure the existing UI correctly informs the user how to enable the extension in Safari settings.
    *   **App Icon:**
        *   In Project Navigator, find `Assets.xcassets` under `Minimal Site Blocker/iOS (App)/` (or shared). Select `AppIcon` for iOS.
    *   **Launch Screen:**
        *   Verify/configure under `Minimal Site Blocker/iOS (App)/` (e.g., `LaunchScreen.storyboard` or via target's "General" tab > "App Icons and Launch Images").
    *   **Info.plist:**
        *   Find `Info.plist` under `Minimal Site Blocker/iOS (App)/`. Check keys like `CFBundleDisplayName`, `CFBundleVersion`, `CFBundleShortVersionString`, `LSRequiresIPhoneOS`, and `MinimumOSVersion`.
2.  **Testing (in Xcode):**
    *   **Select Scheme:** Select the "iOS (App)" scheme.
    *   **Select Device:** Choose an iOS Simulator or a connected physical iOS device.
    *   **Run:** Click Play.
    *   Verify the app UI.
    *   Open Settings app > Safari > Extensions. Enable "Minimal Site Blocker" and configure its permissions.
    *   Test extension in Safari on iOS. Debug via Safari's Develop menu similarly.
3.  **App Store Connect - iOS App:**
    *   Log in to App Store Connect.
    *   Create/configure the app record.
    *   **Build Submission (from Xcode):**
        *   Select the "iOS (App)" scheme and "Any iOS Device (arm64)" (or a connected device).
        *   Go to Product > Archive.
        *   In Organizer, select the archive, click "Distribute App," choose "App Store Connect," "Upload," and follow prompts.

## IV. Post-Submission

1.  **App Review:** Monitor in App Store Connect.
2.  **Release:** Manage in App Store Connect.
3.  **Maintenance & Updates:**
    *   If you update the shared `src/` code:
        *   Ensure changes are reflected in the "Copy Bundle Resources" for both extension targets in Xcode.
        *   Increment build numbers (and version if needed) in the `Info.plist` for "macOS (App)" and "iOS (App)" targets.
        *   Re-archive and submit new builds of both container apps using Xcode's Organizer as described above.

This provides more concrete Xcode actions. Remember to consult Apple's official documentation for the most up-to-date details on Xcode features and App Store submission.
