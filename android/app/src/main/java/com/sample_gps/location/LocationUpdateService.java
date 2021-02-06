package com.sample_gps.location;

import android.annotation.SuppressLint;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.os.Binder;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.google.android.gms.common.images.WebImage;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.gson.Gson;

import java.util.Date;

import static com.sample_gps.constants.Constant.ACTION_BROADCAST;
import static com.sample_gps.constants.Constant.EXTRA_LOCATION;
import static com.sample_gps.constants.Constant.FASTEST_UPDATE_INTERVAL;
import static com.sample_gps.constants.Constant.LOCATION_EVENT_DATA_NAME;
import static com.sample_gps.constants.Constant.LOCATION_EVENT_NAME;
import static com.sample_gps.constants.Constant.TAG;
import static com.sample_gps.constants.Constant.UPDATE_INTERVAL;

public class LocationUpdateService extends Service {
    private FusedLocationProviderClient fusedLocationProviderClient;
    private LocationCallback locationCallback;
    private LocationRequest locationRequest;
    private Location location;
    private Gson gson;
    private BroadcastReceiver eventReceiver;
    private Handler serviceHandler;

    public LocationUpdateService() {
        gson = new Gson();
    }

    @Override
    public void onCreate() {
        Log.d(TAG, "in onCreate()");
        fusedLocationProviderClient = new FusedLocationProviderClient(this);
        locationCallback = new LocationCallback(){
            @Override
            public void onLocationResult(LocationResult locationResult) {
                super.onLocationResult(locationResult);
                onNewLocation(locationResult.getLastLocation());
            }
        };

        createLocationRequest();

        HandlerThread handlerThread = new HandlerThread(TAG);
        handlerThread.start();
        serviceHandler = new Handler(handlerThread.getLooper());


        createEventReceiver();
        registerEventReceiver();

    }

    private void createLocationRequest() {
        locationRequest = new LocationRequest();
        locationRequest.setInterval(UPDATE_INTERVAL);
        locationRequest.setFastestInterval(FASTEST_UPDATE_INTERVAL);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    }

    @SuppressLint("MissingPermission")
    private void requestLocationUpdate() {
        startService(new Intent(getApplicationContext(), LocationUpdateService.class));
        fusedLocationProviderClient.requestLocationUpdates(locationRequest, locationCallback, Looper.myLooper());
    }

    private void onNewLocation(Location lastLocation) {
//        Log.d("location_update", lastLocation.getLatitude() + ", " + lastLocation.getLongitude());
        location = lastLocation;

        LocationCoordinates locationCoordinates = createCoordinates(location.getLatitude(), location.getLongitude());

        Intent intent = new Intent(ACTION_BROADCAST);
        intent.putExtra(EXTRA_LOCATION, location);
        LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(intent);


        Intent eventIntent = new Intent(LOCATION_EVENT_NAME);
        eventIntent.putExtra(LOCATION_EVENT_DATA_NAME, gson.toJson(locationCoordinates));
        getApplicationContext().sendBroadcast(eventIntent);
    }

    private LocationCoordinates createCoordinates(double latitude, double longitude) {
        return new LocationCoordinates()
                .setLatitude(latitude)
                .setLongitude(longitude)
                .setTimestamp(new Date().getTime());
    }

    @SuppressLint("MissingPermission")
    private void getCurrentLocation() {
        fusedLocationProviderClient.getLastLocation().addOnCompleteListener(new OnCompleteListener<Location>() {
            @Override
            public void onComplete(@NonNull Task<Location> task) {
                if (task.isSuccessful() && task.getResult() != null) {
                    location = task.getResult();
                    Log.d("LocationCurrent", "current loc: " + location);
                } else {
                    Log.w(TAG, "cannot get location");
                }
            }
        });
    }

    public void createEventReceiver() {
        eventReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String startStop = intent.getStringExtra("StartLocationTracking");
                 Log.i("HELLOYEA", "start: " + startStop);
                if (startStop.equals("START")) {
                    requestLocationUpdate();
                }
            }
        };
    }

    public void registerEventReceiver() {
        IntentFilter eventFilter = new IntentFilter();
        eventFilter.addAction("LocationUpdateService.startLocationTracking");
        /* mContext */ getApplicationContext().registerReceiver(eventReceiver, eventFilter);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_NOT_STICKY;
    }

//    public class LocalBinder extends Binder {
//        public LocationUpdateService getService() {
//            return LocationUpdateService.this;
//        }
//    }
}
