import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { arc, select } from 'd3';
import { SunburstData, Details, DetailsInfo, SunburstArcData, arcGenerator, expander, collapser } from '../../model';
@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.scss']
})
export class SunburstComponent implements OnChanges {
  @Input() data: SunburstData;
  @ViewChild('gElement') gElement: ElementRef;
  dataMissing: any = {};
  mouseHover: boolean = false;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.data && this.data.componentType) {
      this.generateArcs(this.data.data, this.data.componentType);
    }
  }
  generateArcs(data: Details[], title) {
    const selectedG = select(this.gElement.nativeElement);
    let arcId = 0;
    const textData = [{
      id: 'flexText' + title,
      text: '',
      translate: 15
    },
    {
      id: 'valText' + title,
      text: '',
      translate: -15
    }]

    selectedG
      .selectAll('path')
      .remove();
    let total = 0;
    const ruleTotal = {};
    let initAngle = 0;
    let arcData: SunburstArcData[] = [];
    const innerArcData: SunburstArcData[] = [];
    data.forEach(rule => {
      total += rule.count;
      ruleTotal[rule.name] = ruleTotal[rule.name]
        ? ruleTotal[rule.name] + rule.count
        : rule.count;
    });
    // if total is greater than 0
    if (total === 0) {
      this.dataMissing[title] = true;
      return;
    }
    this.dataMissing[title] = false;

    total = 2 * Math.PI / total;
    // inner ring
    initAngle = 0;
    Object.keys(ruleTotal).forEach(key => {
      // keys = FAIL, WARNING, PASS
      const endAngle = initAngle + ruleTotal[key] * total;
      arcData.push(
        Object.assign(new SunburstArcData(), {
          id: title + 'innerarc' + key,
          color: DetailsInfo[key].color,
          startAngle: initAngle,
          endAngle: endAngle,
          innerRadius: 80,
          outerRadius: 85
        })
      );
      initAngle = endAngle;
    });

    // outer radius
    initAngle = 0;
    const list = {};
    Object.keys(ruleTotal).forEach(key => {
      list[key] = data.filter(itm => itm.name === key);
    });
    Object.keys(list).forEach(ruleName =>
      list[ruleName].forEach(rule => {
        // rule.names = FAIL, WARNING, PASS
        const endAngle = initAngle + rule.count * total;
        arcData.push(
          Object.assign(new SunburstArcData(), {
            id: title + 'arc' + arcId++,
            rule: rule,
            parent: title + 'arc' + rule.name,
            color: DetailsInfo[rule.name].color,
            startAngle: initAngle,
            endAngle: endAngle,
            innerRadius: 100,
            outerRadius: 140
          })
        );
        initAngle = endAngle;
      })
    );

    // inner radius
    initAngle = 0;
    Object.keys(ruleTotal).forEach(key => {
      // keys = FAIL, WARNING, PASS
      const endAngle = initAngle + ruleTotal[key] * total;
      arcData.push(
        Object.assign(new SunburstArcData(), {
          id: title + 'arc' + key,
          rule: {
            name: key,
            count: ruleTotal[key],
            flexName: undefined
          },
          parent: undefined,
          color: DetailsInfo[key].color,
          startAngle: initAngle,
          endAngle: endAngle,
          innerRadius: 80,
          outerRadius: 100
        })
      );
      initAngle = endAngle;
    });
    arcData = Object.assign([], arcData);

    selectedG
      .selectAll('path')
      .data(arcData)
      .enter()
      .append('path')
      .attr('id', d => d.id)
      .attr('d', arcGenerator)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .on('mouseover', d => {
        selectedG
          .selectAll('path')
          .style('opacity', 0.8)
        if (!d.id.includes('inner')) {
          this.mouseHover = true;
          if (d.parent) {
            select('#' + d.parent)
              .transition()
              .delay(100)
              .attr('d', expander)
              .style('opacity', 1.0)
          }
          select('#' + d.id)
            .transition()
            .delay(100)
            .attr('d', expander)
            .style('opacity', 1.0);

          select('#flexText' + title)
            .text((flex) => d.rule.flexName ? d.rule.flexName : 'Total')
            .style('fill', '#888888')
            .style('font-size', '20px')
            .style('opacity', 1)

          select('#valText' + title)
            .text((val) => d.rule.count + '')
            .style('fill', '#565656')
            .style('font-size', '48px')
            .style('opacity', 1)
        } else {
          select('#' + d.id)
            .style('opacity', 1.0)
        }
      })
      .on('mouseout', d => {
        select('#flexText' + title)
          .text((flex) => d.rule.flexName ? d.rule.flexName : 'Total')
          .style('opacity', 0);

        select('#valText' + title)
          .text((val) => d.rule.count + '')
          .style('opacity', 0);

        selectedG
          .selectAll('path')
          .style('opacity', 1.0)
        if (!d.id.includes('inner')) {
          this.mouseHover = false;
          if (d.parent) {

            select('#' + d.parent)
              .transition()
              .delay(100)
              .attr('d', collapser);
          }

          select('#' + d.id)
            .transition()
            .delay(100)
            .attr('d', collapser);
        }
      })

    selectedG
      .selectAll('text')
      .data(textData)
      .enter()
      .append('text')
      .attr('id', d => d.id)
      .attr('transform', function (d) {
        return 'translate(0,' +
          d.translate
          + ')';
      })
      .attr('dy', d => {
        if (d.id.includes('flex')) {
          return '1.0em'
        } else { return '0.2em' }
      })
      .attr('text-anchor', 'middle')
      .text((d) => d.text)
      .style('font-size', '48px')
      .style('opacity', 1)
      .style('fill', '#0000')
      .style('font-size', '20px')
  }
}

