package com.sample_gps.constants;

import com.sample_gps.location.LocationUpdateService;

public class Constant {
    public static final long UPDATE_INTERVAL = 1000 * 10;
    public static final long FASTEST_UPDATE_INTERVAL = UPDATE_INTERVAL / 2;
    public static final String TAG = LocationUpdateService.class.getSimpleName();
    public static final String MODULE_NAME = "LocationManager";

//    public static final String CONST_JS_LOCATION_EVENT_NAME = "JS_LOCATION_EVENT_NAME";
//    public static final String CONST_JS_LOCATION_LAT = "JS_LOCATION_LAT_KEY";
//    public static final String CONST_JS_LOCATION_LON = "JS_LOCATION_LON_KEY";
//    public static final String CONST_JS_LOCATION_TIME = "JS_LOCATION_TIME_KEY";

    public static final String PACKAGE_NAME = "com.sample_gps.location";
    public static final String ACTION_BROADCAST = PACKAGE_NAME + ".broadcast";

    public static final String EXTRA_LOCATION = PACKAGE_NAME + ".location";

    public static final String JS_LOCATION_LAT_KEY = "latitude";
    public static final String JS_LOCATION_LON_KEY = "longitude";
    public static final String JS_LOCATION_TIME_KEY = "timestamp";
    public static final String JS_LOCATION_EVENT_NAME = "location_received";

    public static final String LOCATION_EVENT_NAME = "com.sample_gps.LOCATION_INFO";
    public static final String LOCATION_EVENT_DATA_NAME = "LocationData";
}
