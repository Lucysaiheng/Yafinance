import datetime
import json

from django.core.management.base import BaseCommand, CommandError
from finance.yafinance.models import Company


class Command(BaseCommand):
    help = 'Load yahoo finance company data into the database'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str)

    def handle(self, *args, **options):
        json_path = options['json_file']

        self.stdout.write(self.style.SUCCESS('Loading JSON from "{}"'.format(json_path)))
        data = json.load(open(json_path))

        total = len(data)

        self.stdout.write(self.style.SUCCESS('Processing {} rows'.format(total)))

        skipped = []






        for i, row in enumerate(data):
            name = row['name']
            cid = row['ticker']
            copen = row['Open']
            previous_close = row['Previous Close']
            bid = row['Bid']
            ask = row['Ask']
            day_min = row['Day minimum']
            day_max = row['Day maximum']
            week_min = row['Week minimum']
            week_max = row['Week maximum']
            volume = row['Volume'].replace(",", "")
            avgvolume = row['Avg. Volume'].replace(",", "")
            market_cap = row['Market Cap']
            EPS = row['EPS (TTM)']
            url = row['url']
            region = row['region']
            latitude = row['lat']
            longtitude = row['lon']

            if not name or not cid or not copen or not previous_close or not bid or not ask or not day_min or not day_max or not week_max or not week_min or not volume or not volume or not avgvolume or not market_cap or not EPS or not url or not region or not latitude or not longtitude:
                skipped.append(row)
                continue

            company, _ = Company.objects.get_or_create(
                name=row['name'],
                cid = row['ticker'],
                copen = row['Open'],
                previous_close = row['Previous Close'],
                bid = row['Bid'],
                ask = row['Ask'],
                day_min = row['Day minimum'],
                day_max = row['Day maximum'],
                week_min = row['Week minimum'],
                week_max = row['Week maximum'],
                volume = row['Volume'].replace(",", ""),
                avgvolume = row['Avg. Volume'].replace(",", ""),
                market_cap = row['Market Cap'],
                EPS = row['EPS (TTM)'],
                url = row['url'],
                region = row['region'],
                latitude = row['lat'],
                longtitude = row['lon']
            )



        self.stdout.write(self.style.SUCCESS('Processed {}/{}'.format(i + 1, total)), ending='\r')
        self.stdout.flush()

        if skipped:
            self.stdout.write(self.style.WARNING("Skipped {} records".format(len(skipped))))
            with open('skipped.json', 'w') as fh:
                json.dump(skipped, fh)
