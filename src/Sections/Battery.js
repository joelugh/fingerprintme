import React from 'react';
import TypeGroup from '../Terminal/TypeGroup';
import Type from '../Terminal/Type';

function Battery() {

    const [loaded, setLoaded] = React.useState(null);
    const [batteryCharging, setBatteryCharging] = React.useState("");
    const [batteryLevel, setBatteryLevel] = React.useState("");
    const [chargingTime, setChargingTime] = React.useState("");
    const [dischargingTime, setDischargingTime] = React.useState("");

    React.useEffect(() => {

        if (!navigator.getBattery || typeof navigator.getBattery !== "function") {
            return;
        }

        navigator.getBattery()
        .then(function(battery = {}) {

            setLoaded(true);

            function updateAllBatteryInfo(){
                updateChargeInfo();
                updateLevelInfo();
                updateChargingInfo();
                updateDischargingInfo();
            }
            updateAllBatteryInfo();

            battery.addEventListener('chargingchange', function(){
                updateChargeInfo();
            });
            function updateChargeInfo(){
                setBatteryCharging(battery.charging ? "Yes" : "No");
            }

            battery.addEventListener('levelchange', function(){
                updateLevelInfo();
            });

            function updateLevelInfo(){
                setBatteryLevel(battery.level * 100 + "%");
            }

            battery.addEventListener('chargingtimechange', function(){
                updateChargingInfo();
            });
            function updateChargingInfo(){
                const ct = battery.chargingTime;
                if (isFinite(ct)) setChargingTime(`${Math.round(ct/36)/100}h`);
            }

            battery.addEventListener('dischargingtimechange', function(){
                updateDischargingInfo();
            });
            function updateDischargingInfo(){
                const ct = battery.dischargingTime;
                if (isFinite(ct)) setDischargingTime(`${Math.round(ct/36)/100}h`);
            }
        })
        .catch(err => {
            console.log(err);
        });

  }, []);

    const rows = []
    if (batteryCharging) rows.push({name: "Battery Charging", value: batteryCharging});
    if (batteryLevel) rows.push({name: "Battery Level", value: batteryLevel});
    if (chargingTime) rows.push({name: "Battery Charging Time", value: chargingTime});
    if (dischargingTime) rows.push({name: "Battery Discharging Time", value: dischargingTime});

    return (
        <TypeGroup>
            {loaded && <Type
                command={'./snoop battery activity'}
            />}
            {loaded && rows.map(({name, value}) =>
                <Type
                    result={`${name}: ${value}`}
                />
            )}
        </TypeGroup>
    );

}

export default Battery;
