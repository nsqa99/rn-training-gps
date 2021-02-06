package com.sample_gps;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;

import com.facebook.react.ReactActivity;
import com.sample_gps.location.LocationUpdateService;

public class MainActivity extends ReactActivity {
  private final ServiceConnection serviceConnection = new ServiceConnection() {
    @Override
    public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
     // LocationUpdateService.LocalBinder binder = (LocationUpdateService.LocalBinder) iBinder;
    }

    @Override
    public void onServiceDisconnected(ComponentName componentName) {

    }
  };

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Sample_GPS";
  }

  @Override
  protected void onStart() {
    super.onStart();
    bindService(new Intent(this, LocationUpdateService.class), serviceConnection, Context.BIND_AUTO_CREATE);
  }
}
