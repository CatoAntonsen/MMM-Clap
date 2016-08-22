# MagicMirror Module: MMM-Clap
The 'MMM-Clap' module is for detecting claps using a LM939 Sound Detector and sending socket notification to be consumed by other modules.

Fornoth/spotify-connect-web. 

## Prerequisites
You will need to connect a LM939 Sound Sensor

#Installation of the module

In your terminal, go to your MagicMirror's Module folder:

    cd ~/MagicMirror/modules

Clone this repository:

    git clone https://github.com/CatoAntonsen/MMM-Clap.git

Configure the module in your config.js file.
## Using the module
To use this module, add it to the modules array in the `config/config.js` file:

    modules: [
    	{
    		module: 'MMM-Clap',
    		config: {
				GpioPin: 24,
				MinTimeBetweenClaps: 50,
				MaxTimeBetweenClaps: 1000,
				WaitAfterLastClap: 1500
    		}
    	}
    ]

## Configuration options

The following properties can be configured:


<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>GpioPin</code></td>
			<td>What pin you've connected the signal (white) connector on your Raspberry board.<br>
				<br><b>Default value:</b> <code>24</code>
			</td>
		</tr>
		<tr>
			<td><code>MinTimeBetweenClaps</code></td>
			<td>TODO<br>
				<br><b>Default value:</b> <code>50</code>
			</td>
		</tr>
		<tr>
			<td><code>MaxTimeBetweenClaps</code></td>
			<td>TODO<br>
				<br><b>Default value:</b> <code>1000</code>
			</td>
		</tr>
		<tr>
			<td><code>WaitAfterLastClap</code></td>
			<td>TODO<br>
				<br><b>Default value:</b> <code>1500</code>
			</td>
		</tr>
		
	</tbody>
</table>
## Credits
- 
