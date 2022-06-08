
Config variables for React Native apps
Module to expose config variables to your javascript code in React Native, supporting iOS, Android and Windows.

Bring some 12 factor love to your mobile apps!

Basic Usage
Create a new file .env in the root of your React Native app:

API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
Then access variables defined there from your app:

import Config from "react-native-config";

Config.API_URL; // 'https://myapi.com'
Config.GOOGLE_MAPS_API_KEY; // 'abcdefgh'
Keep in mind this module doesn't obfuscate or encrypt secrets for packaging, so do not store sensitive keys in .env. It's basically impossible to prevent users from reverse engineering mobile app secrets, so design your app (and APIs) with that in mind.

Setup
Install the package:

$ yarn add react-native-config
Link the library:

(Note: For React Native 0.60 or greater, autolinking is available)

(Note: For Windows, this module supports autolinking when used with react-native-windows@0.63 or later. For earlier versions you need to manually link the module.)

$ react-native link react-native-config
if cocoapods are used in the project then pod has to be installed as well:

(cd ios; pod install)
Manual Link (iOS)

In XCode, in the project navigator, right click Libraries ➜ Add Files to [your project's name]
Go to node_modules ➜ react-native-config and add ReactNativeConfig.xcodeproj
Expand the ReactNativeConfig.xcodeproj ➜ Products folder
In the project navigator, select your project. Add libReactNativeConfig.a to your project's Build Phases ➜ Link Binary With Libraries
And go the Build Settings tab. Make sure All is toggled on (instead of Basic)
Look for Header Search Paths and add $(SRCROOT)/../node_modules/react-native-config/ios/** as non-recursive
Manual Link (Android)

android/settings.gradle

+ include ':react-native-config'
+ project(':react-native-config').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-config/android')
android/app/build.gradle

dependencies {
	implementation "com.facebook.react:react-native:+"  // From node_modules
+	implementation project(':react-native-config')
}
MainApplication.java

+ import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;

@Override
protected List<ReactPackage> getPackages() {
	   return Arrays.asList(
       		new MainReactPackage()
+      		new ReactNativeConfigPackage()
    );
}
Manual Link (Windows)

windows/myapp.sln

Add the RNCConfig project to your solution.

Open the solution in Visual Studio 2019
Right-click Solution icon in Solution Explorer > Add > Existing Project
if using react-native-windows@0.62 or later select node_modules\react-native-config\windows\RNCConfig\RNCConfig.vcxproj
if using react-native-windows@0.61 select node_modules\react-native-config\windows\RNCConfig61\RNCConfig61.vcxproj
windows/myapp/myapp.vcxproj

Add a reference to RNCConfig to your main application project. From Visual Studio 2019:

Right-click main application project > Add > Reference...
Check RNCConfig from Solution Projects.
pch.h

Add #include "winrt/RNCConfig.h".

app.cpp

Add PackageProviders().Append(winrt::RNCConfig::ReactPackageProvider()); before InitializeComponent();.

Extra step for Android
You'll also need to manually apply a plugin to your app, from android/app/build.gradle:

// 2nd line, add a new apply:
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
Advanced Android Setup
In android/app/build.gradle, if you use applicationIdSuffix or applicationId that is different from the package name indicated in AndroidManifest.xml in <manifest package="..."> tag, for example, to support different build variants: Add this in android/app/build.gradle

defaultConfig {
    ...
    resValue "string", "build_config_package", "YOUR_PACKAGE_NAME_IN_ANDROIDMANIFEST_XML"
}
Native Usage
Android
Config variables set in .env are available to your Java classes via BuildConfig:

public HttpURLConnection getApiClient() {
    URL url = new URL(BuildConfig.API_URL);
    // ...
}
You can also read them from your Gradle configuration:

defaultConfig {
    applicationId project.env.get("APP_ID")
}
And use them to configure libraries in AndroidManifest.xml and others:

<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="@string/GOOGLE_MAPS_API_KEY" />
All variables are strings, so you may need to cast them. For instance, in Gradle:

versionCode project.env.get("VERSION_CODE").toInteger()
Once again, remember variables stored in .env are published with your code, so DO NOT put anything sensitive there like your app signingConfigs.

iOS
Read variables declared in .env from your Obj-C classes like:

// import header
#import "ReactNativeConfig.h"

// then read individual keys like:
NSString *apiUrl = [ReactNativeConfig envFor:@"API_URL"];

// or just fetch the whole config
NSDictionary *config = [ReactNativeConfig env];
Windows
You can access variables declared in .env from C++ in your App project:

std::string api_key = ReactNativeConfig::API_KEY;
Similarly, you can access those values in other project by adding reference to the RNCConfig as described in the manual linking section.
