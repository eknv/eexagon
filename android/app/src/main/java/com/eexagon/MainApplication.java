package com.eexagon;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.devsupport.DevInternalSettings;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new ReactNativeConfigPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new RNFSPackage(),
            new SplashScreenReactPackage(), new SvgPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // TODO: waiting for haul to support the delta bundles
    /*
     * DevInternalSettings settings = (DevInternalSettings)
     * getReactNativeHost().getReactInstanceManager().getDevSupportManager().
     * getDevSettings(); if (settings != null) {
     * settings.setBundleDeltasEnabled(false); }
     */
  }
}
