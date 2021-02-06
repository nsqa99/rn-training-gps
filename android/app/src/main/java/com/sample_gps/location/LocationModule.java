package com.sample_gps.location;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;

import javax.annotation.Nonnull;

import static com.sample_gps.constants.Constant.JS_LOCATION_EVENT_NAME;
import static com.sample_gps.constants.Constant.JS_LOCATION_LAT_KEY;
import static com.sample_gps.constants.Constant.JS_LOCATION_LON_KEY;
import static com.sample_gps.constants.Constant.JS_LOCATION_TIME_KEY;
import static com.sample_gps.constants.Constant.LOCATION_EVENT_DATA_NAME;
import static com.sample_gps.constants.Constant.LOCATION_EVENT_NAME;
import static com.sample_gps.constants.Constant.MODULE_NAME;

public class LocationModule extends ReactContextBaseJavaModule implements JSEventSender {
    private Context context;
    private BroadcastReceiver broadcastReceiver;
    private Gson gson;

    LocationModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        gson = new Gson();
        createEventReceiver();
        registerEventReceiver();
    }

    @ReactMethod
    public void startLocationTracking() {
        Log.d("HELLNO", "this is a fucking log");
        Intent eventIntent = new Intent("LocationUpdateService.startLocationTracking");
        eventIntent.putExtra("StartLocationTracking", "START");
        getReactApplicationContext().sendBroadcast(eventIntent);
    }


    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    public void createEventReceiver() {
        broadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                LocationCoordinates locationCoordinates = gson.fromJson(
                        intent.getStringExtra(LOCATION_EVENT_DATA_NAME),
                        LocationCoordinates.class);

                WritableMap eventData = Arguments.createMap();
                eventData.putDouble(JS_LOCATION_LAT_KEY, locationCoordinates.getLatitude());
                eventData.putDouble(JS_LOCATION_LON_KEY, locationCoordinates.getLongitude());
                //eventData.putDouble(JS_LOCATION_TIME_KEY, locationCoordinates.getTimestamp());

                // if you actually want to send events to JS side, it needs to be in the "Module"
                sendEventToJS(getReactApplicationContext(), JS_LOCATION_EVENT_NAME, eventData);
            }
        };
    }

    public void registerEventReceiver() {
        IntentFilter eventFilter = new IntentFilter();
        eventFilter.addAction(LOCATION_EVENT_NAME);
        context.registerReceiver(broadcastReceiver, eventFilter);
    }

    @Override
    public void sendEventToJS(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
